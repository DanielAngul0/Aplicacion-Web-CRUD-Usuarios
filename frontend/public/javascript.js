// Iniciador de codigo JavaScript al momento de que el HTML ha cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    const formularioUsuarios = document.getElementById('formularioUsuarios');
    const tablaUsuarios = document.getElementById('tablaUsuarios');

    // Obtener todos los usuarios y mostrarlos en la tabla
    const fetchUsuarios = async () => {
        // 'fetch' es el encargado de realizar solicitudes a un servidor
        const res = await fetch('/usuarios');
        // los usuarios obtenidos anteriormente en 'res' pasaran a ser un objeto en formato JSON ya que el servidor esta configurado de esa manera
        const data = await res.json();
        // limpia el contenido de la tabla antes de añadir las nuevas filas asegurando asi que  muestre solo la información mas reciente, de no tener este codigo, se duplicaran los datos
        tablaUsuarios.innerHTML = '';
        // se crea un 'forEach' para itinerar cada usuario
        data.forEach(usuario => {
            // se crea una fila
            const row = document.createElement('tr');
            // la fila creada contendra datos del usuario 'id', 'nombre' y botones con acciones como 'Editar', 'Borrar' ademas, cada vez que se presione sus respectivos botones, pasara el 'id' de dicho 'usuario'
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td class="actions">
                    <button onclick="editUser(${usuario.id})">Editar</button>
                    <button class="delete" onclick="deleteUser(${usuario.id})">Eliminar</button>
                </td>
            `;
            // mostrara el resultado de la fila en la tabla
            tablaUsuarios.appendChild(row);
        });
    };

    // Crear un nuevo usuario
    // Se activa un escuchador de eventos al formularioUsuarios, que escuchara el evento 'submit'
    formularioUsuarios.addEventListener('submit', async (e) => {
        // Con este codigo, al momento de enviar el formulario, la pagina no se recargara
        e.preventDefault();
        // Guardara lo que se encuentre en el input type="text" del HTML
        const nombre = document.getElementById('nombre').value;

        // 'trim()' elimina cualquier espacio en blanco al principio y al final de la cadena, ademas de verificar si el nombre no está vacío. 
        if (nombre.trim()) {
            // Se crea una solicitud 'HTTP' de metodo 'POST', despues se agrega un encabezado 'headers' a la solicitud, indicando que el cuerpo de la solicitud contendra datos en formato JSON, despues en 'body', el contenido se convierte en formato JSON y se envia como objeto al servidor
            await fetch('/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre })
            });
            // Este codigo llamara al nuevo usuario la tabla
            fetchUsuarios();
            // Este codigo reseteara el formulario y se preparara para recibir un nuevo usuario
            formularioUsuarios.reset();
        }
    });

    // Eliminar usuario
    // La funcion 'deleteUser' se iniciara con el 'id' del usuario seleccionado
    // 'window' para que sea accesible globalmente en el documento actual
    window.deleteUser = async (id) => {
        // Se utiliza la función confirm, que muestra un cuadro de diálogo con un mensaje y dos botones (Aceptar y Cancelar). Si el usuario hace clic en "Aceptar", la ejecución del código continúa; de lo contrario, se interrumpe.
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            // Si el usuario confirma la eliminación, se realiza una solicitud HTTP a la ruta /usuarios/${id}, con el metodo 'DELETE', indicando al servidor la eliminacion de un usuario
            await fetch(`/usuarios/${id}`, {
                method: 'DELETE'
            });
            // Se llamara a 'fetchUsuarios();' para que actualice automaticamente la tabla
            fetchUsuarios();
        }
    };

    // Editar usuario (implementar según prefieras)
    //La funcion 'editUser' se iniciara con el 'id' del usuario seleccionado
    // 'window' para que sea accesible globalmente en el documento actual
    window.editUser = async (id) => {
        // Generara un 'prompt' en el que se pedira la actualizacion del nombre del usuario, en caso del usuario cancelarlo, el valor de 'nuevoNombre' sera nulo
        const nuevoNombre = prompt('Nuevo nombre:');
        if (nuevoNombre) {
            // Si hay un nuevo nombre, se realiza una solicitud HTTP a la ruta '/usuarios/${id}', donde ${id} es el identificador del usuario a editar, la solicitud sera de metodo 'PUT', despues se agrega un encabezado 'headers' a la solicitud, indicando que el cuerpo de la solicitud contendra datos en formato JSON, despues en 'body', el contenido se convierte en formato JSON y se envia como objeto al servidor
            await fetch(`/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre: nuevoNombre })
            });
            // Se llamara a 'fetchUsuarios();' para que actualice automaticamente la tabla
            fetchUsuarios();
        }
    };

    // Carga todos los usuarios existentes al momento de abrirse la pagina
    fetchUsuarios();
});
