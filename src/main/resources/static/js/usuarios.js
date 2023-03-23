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
            await fetch('api/usuarios/' + id, {
                method: 'DELETE',
                headers: getHeaders()
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
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
