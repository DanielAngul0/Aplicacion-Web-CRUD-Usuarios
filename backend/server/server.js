// ----- 'server.js' es el archivo principal en el cual se configura todo el servidor, por lo cual todos los middeware que se usen y las configuraciones que tenga este archivo afectara a todos los demas archivos a los que 'server.js' les tenga configuracion o se vinculen a el -----


// importando el framework 'express'
import express from 'express'
// importa todas las rutas del CRUD de la carpeta '../rutas/usuarios.js' para que sea accesibles bajo la direccion '/usuarios'
import usuariosRouter from '../rutas/usuarios.js'

// creando instancia de la aplicacion 'express'
const app = express();
// Creando puerto 3000
const port = 3000;

// Este middleware ayuda a express a interpretar codigo en formato JSON, util para los metodos HTTP que seran comprendidos a traves de req.body manejando los datos del cliente
app.use(express.json());
// Este middleware es esencial para que cualquier archivo de la carpeta 'Public' sea accesible desde la URL: 'http://localhost:3000/', es decir; 'public/index.html' ahora sera la pagina principal
app.use(express.static('../public'));
// Todas las rutas definidas en 'usuariosRouter' estarán bajo el prefijo '/usuarios'. Esto significa que, al hacer una solicitud a '/usuarios', esa solicitud será gestionada por 'usuariosRouter', que se encargará de manejar las operaciones del CRUD y las rutas relacionadas con los usuarios.
app.use('/usuarios', usuariosRouter);

// Creando un manejo de errores e implementando un codigo de estado 404 para las rutas no encontradas
app.use((req, res) => {
    res.status(404).send('ERROR(404) Lo sentimos, ruta no encontrada.');
});

// Servidor a la escucha en el puerto 3000
app.listen(port , () =>{
    console.log(`Servidor a la escucha en el puerto: ${port}`);
})