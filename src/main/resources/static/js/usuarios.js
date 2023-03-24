// Call the dataTables jQuery plugin

$(document).ready(function () {
    cargarUsuarios();
    $('#usuarios').DataTable();
    actualizarEmailDelUsuario();

});

function actualizarEmailDelUsuario() {
    document.getElementById("txt-email-usuario").outerHTML = localStorage.email;
}

async function cargarUsuarios(busqueda = '') {

    const buscarId = isNaN(busqueda) ? 0 : parseInt(busqueda)

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();


    let listadoHtml = '';
    let encontrado = false;
    for (let usuario of usuarios) {
        // Solo mostrar usuarios que coincidan con la búsqueda
        if (buscarId === usuario.id || usuario.nombre.includes(busqueda) || usuario.apellido.includes(busqueda) || usuario.email.includes(busqueda)) {
            let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonEditar = '<a href="#" onclick="editarUsuario(' + usuario.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';

            let telefonoTexto = usuario.telefono == null ? '' : usuario.telefono;
            let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + '</td><td>'
                + usuario.apellido + '</td><td>' + usuario.email + '</td><td>' + telefonoTexto + '' +
                '</td><td>' + botonEliminar + " " + botonEditar + '</td></tr>';

            listadoHtml += usuarioHtml;
            encontrado = true;
        }
    }
    if (!encontrado) {
        listadoHtml = '<tr><td colspan="6" class="text-center">No se encontraron usuarios</td></tr>';
    }


    document.querySelector("#usuarios tbody").outerHTML = listadoHtml;
}


function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    Swal.fire({
        title: 'Estás seguro?',
        text: "No podrás revertirlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'No, cancela!',
        reverseButtons: true,
        confirmButtonColor: '#50C878',
        cancelButtonColor: '#cf142b'
    }).then(async (result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Tu usuario ha sido eliminado.',
                'success'
            )
            await fetch('api/delUsuario/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });
            cargarUsuarios();

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Tu usuario está seguro :)',
                'error'
            )
        }

    })
}

async function buscarUsuario() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarUsuarios(busqueda);
}

async function editarUsuario(id) {
    // obtener información del usuario
    const request = await fetch('api/getUsuario/' + id, {
        method: 'GET',
        headers: getHeaders()
    });
    const usuario = await request.json();

    const {value: formValues} = await Swal.fire({
        title: 'Editar usuario',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + usuario.nombre + '">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + usuario.apellido + '">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + usuario.email + '">' +
            '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" value="' + (usuario.telefono || '') + '">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    })

    if (formValues) {
        const nombre = document.getElementById("swal-input1").value;
        const apellido = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const telefono = document.getElementById("swal-input4").value;

        const nuevoUsuario = {
            nombre,
            apellido,
            email,
            telefono
        };

        // actualizar usuario
        const response = await fetch('api/editUsuarios/' + usuario.id, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(nuevoUsuario)
        });

        if (response.ok) {
            // si la actualización fue exitosa, mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado correctamente'
            }).then(() => {
                // recargar lista de usuarios
                cargarUsuarios();
            });
        } else {
            // si la actualización falló, mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar el usuario'
            });
        }
    }
}

