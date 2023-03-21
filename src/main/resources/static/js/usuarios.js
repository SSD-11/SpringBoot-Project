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

    const buscarId = isNaN(busqueda) ?0 : parseInt(busqueda)

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();


    let listadoHtml = '';
    let encontrado = false;
    for (let usuario of usuarios) {
        // Solo mostrar usuarios que coincidan con la búsqueda
        if(buscarId === usuario.id || usuario.nombre.includes(busqueda) || usuario.apellido.includes(busqueda) || usuario.email.includes(busqueda)) {
            let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
            let botonEditar = '<a href="#" onclick="editarUsuario(' + usuario.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';

            let telefonoTexto = usuario.telefono == null ? '' : usuario.telefono;
            let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + '</td><td>'
                + usuario.apellido + '</td><td>' + usuario.email +'</td><td>' + telefonoTexto + '' +
                '</td><td>' + botonEliminar + " " + botonEditar +'</td></tr>';

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

    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
        customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }


        if (!result.isConfirmed) {
            return
        }

        const request = await fetch('api/usuarios/' + id, {
            method: 'DELETE',
            headers: getHeaders()
        });
        window.location.reload();

    })

}

async function buscarUsuario() {
    const busqueda = document.getElementById("entrada-search").value;
    cargarUsuarios(busqueda);
}
