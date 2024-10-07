// Importando 'Router' de 'express', Router es util para cuando creas rutas en distintos archivos o modulos, logrando una mayor legibilidad en el codigo
import { Router } from "express";
// Importando o Llamando la conexion de la base de datos a este archivo
import { pool } from '../db/conexion.js';

// Crea un nuevo router que se puede usar para crear nuevas rutas, configurar estas rutas y poder usarlas en otros archivos
const rutas = Router();

// Obtener todos los usuarios
rutas.get('/' , async (req,res) => {
    // Espera hasta tener todos los usuarios de la base de datos y los envia en respuesta
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
});

// Crear un nuevo usuario
rutas.post('/' , async (req,res) => {
    // extrae el contenido de la solicitud
    const { nombre } = req.body;

    // si el contenido esta vacio enviara un mensaje de error, de no estarlo se realizara un insert en la tabla usuarios
    if (!nombre) return res.status(400).send('El nombre es requerido');
    await pool.query('INSERT INTO usuarios (nombre) VALUES (?)', [nombre]);
    // Envia respuesta, estado (201:Creado)
    res.status(201).send('Usuario creado');
});

// Actualizar un usuario
rutas.put('/:id' , async (req,res) => {
    // extrae el 'id' de los parametros de la ruta
    const {id} = req.params;
    // extrae el 'nombre' del cuerpo de la solicitud
    const {nombre} = req.body;

    // Actualiza el nombre del usuario en la tabla usuarios donde el ID coincide con el ID proporcionado en la URL
    await pool.query('UPDATE usuarios SET nombre = ? WHERE id = ?', [nombre, id]);
    // Envia respuesta
    res.send('Usuario actualizado');
});

// Eliminar un usuario
rutas.delete('/:id' , async (req,res) => {
    // extrae el 'id' de los parametros de la ruta
    const { id } = req.params

    // elimina el usuario en la tabla usuarios donde el ID coincide con el ID proporcionado en la URL.
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    // Envia respuesta
    res.send('Usuario eliminado');
});

// exporta una instancia de 'Router' en 'rutas' para ser usado en otros archivos
export default rutas;