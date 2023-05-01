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

    const request = await fetch('api/inquilinos', {
        method: 'GET',
        headers: getHeaders()
    });
    const inquilinos = await request.json();


    let listadoHtml = '';
    let encontrado = false;
    for (let inquilino of inquilinos) {
        // Solo mostrar usuarios que coincidan con la búsqueda
        let telefonoTexto = inquilino.telefono == null ? '' : inquilino.telefono;
        let vehiculo = inquilino.vehiculo === true ? 'SI' : 'NO'
        let mascota = inquilino.mascota === true ? 'SI' : 'NO'

        if (buscarId === inquilino.documento /*|| inquilino.n_Apto*/ || inquilino.tipo_Usuario.includes(busqueda) || inquilino.nombre.includes(busqueda) || inquilino.apellido.includes(busqueda) || inquilino.email.includes(busqueda) || telefonoTexto.includes(busqueda) || vehiculo.includes(busqueda) || mascota.includes(busqueda)) {
            let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + inquilino.documento + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonEditar = '<a href="#" onclick="editarUsuario(' + inquilino.documento + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';
            let botonSubirFoto = '<a href="#" onclick="subirFoto(' + inquilino.documento + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-camera"></i></a>';


            let usuarioHtml = '<tr><td>' + inquilino.documento + '</td><td> <img height="128" width="128" src="' + inquilino.foto +
                '" alt="Foto"> </td><td>' + inquilino.tipo_Usuario + '</td><td>'
                + inquilino.n_Apto + '</td><td>' + inquilino.nombre + '</td><td>' + inquilino.apellido +
                '</td><td>' + inquilino.email + '</td><td>' + telefonoTexto + '' + '</td><td>'
                + vehiculo + '</td><td>' + mascota +
                '</td><td>' + botonSubirFoto + " " + botonEditar + " " + botonEliminar + '</td></tr>';

            listadoHtml += usuarioHtml;
            encontrado = true;
        }
    }
    if (!encontrado) {
        listadoHtml = '<tr><td colspan="10" class="text-center">No se encontraron usuarios</td></tr>';
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


async function eliminarUsuario(documento) {

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
            await fetch('api/delInquilino/' + documento, {
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

async function editarUsuario(documento) {
    // obtener información del usuario
    const request = await fetch('api/getInquilino/' + documento, {
        method: 'GET',
        headers: getHeaders()
    });
    const usuario = await request.json();

    const {value: formValues} = await Swal.fire({
        title: 'Editar usuario',
        html:
            '<label for="swal-input1">Nombre:&#160 &#160 &#160 </label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + usuario.nombre + '">' +
            '<label for="swal-input2">Apellido:&#160 &#160 &#160</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Apellido" value="' + usuario.apellido + '">' +
            '<label for="swal-input3">Email: &#160 &#160 &#160 &#160 &#160</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + usuario.email + '">' +
            '<label for="swal-input4">Teléfono:&#160 &#160 &#160</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="Teléfono" value="' + (usuario.telefono || '') + '">' +
            '<label for="swal-input6">Tipo_user:&#160&#160&#160</label>' +
            '<input id="swal-input6" class="swal2-input" placeholder="Tipo de usuario" value="' + (usuario.tipo_Usuario || '') + '">' +
            '<label for="swal-input7">N_Apto:&#160 &#160 &#160 &#160</label>' +
            '<input id="swal-input7" class="swal2-input" placeholder="Número de apto" value="' + (usuario.n_Apto || '') + '">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar'
    });


    if (formValues) {
        const nombre = document.getElementById("swal-input1").value;
        const apellido = document.getElementById("swal-input2").value;
        const email = document.getElementById("swal-input3").value;
        const telefono = document.getElementById("swal-input4").value;
        const tipo_Usuario = document.getElementById("swal-input6").value;
        const n_Apto = document.getElementById("swal-input7").value;

        const nuevoUsuario = {
            tipo_Usuario,
            n_Apto,
            nombre,
            apellido,
            email,
            telefono

        };

        // actualizar usuario
        const response = await fetch('api/editInquilino/' + usuario.documento, {
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


function subirFoto(documento) {
    Swal.fire({
        title: 'Cargar foto',
        html: `
      <form id="fotoForm">
        <input type="file" name="foto" id="fotoInput" accept="image/*">
      </form>
    `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
            const fotoInput = document.querySelector('#fotoInput');
            const file = fotoInput.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            return new Promise((resolve, reject) => {
                reader.onload = function () {
                    const base64Image = reader.result.split(',')[1];
                    const dataUrl = "data:image/png;base64," + base64Image;

                    fetch(`/api/guardarImagenById/` + documento, {
                        method: 'PUT',
                        body: JSON.stringify({foto: dataUrl}),
                        headers: getHeaders()
                    })
                        .then(response => {
                            if (!response.ok) {
                                reject(response.statusText);
                            } else {
                                resolve(response.json());
                            }
                        })
                        .catch(error => {
                            reject(error);
                        });
                };
            });
        },
        focusConfirm: false,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Foto guardada',
                icon: 'success'
            });
            cargarUsuarios();
        }
    });
}