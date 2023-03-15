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

    const request = await fetch('api/usuarios', {
        method: 'GET',
        headers: getHeaders()
    });
    const usuarios = await request.json();


    let listadoHtml = '';
    let encontrado = false;
    for (let usuario of usuarios) {
        // Solo mostrar usuarios que coincidan con la búsqueda
        if (usuario.nombre.includes(busqueda) || usuario.apellido.includes(busqueda) || usuario.email.includes(busqueda)) {
            let botonEliminar = '<a href="#" onclick="eliminarUsuario(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

            let telefonoTexto = usuario.telefono == null ? '' : usuario.telefono;
            let usuarioHtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + '</td><td>'
                + usuario.apellido + '</td><td>' + usuario.email + '</td><td>' + telefonoTexto + '' +
                '</td><td>' + botonEliminar + '</td></tr>';

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

    if (!confirm("¿Está seguro de eliminar el usuario?"))
        return;


    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders()
    });

    document.location.reload();
}

async function buscarUsuario() {
    const busqueda = document.getElementById('input-buscar-usuario').value;
    cargarUsuarios(busqueda);
}

/*                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Lista de Usuarios</h6>
                        <div class="input-group mb-3"  style = "position: absolute; right: -770px; top: 12px"  >
                            <input type="text" style="width: 200px" placeholder="Buscar usuario" id="input-buscar-usuario" onkeydown="if(event.keyCode===13)buscarUsuario()">
                        </div>
                    </div>*/