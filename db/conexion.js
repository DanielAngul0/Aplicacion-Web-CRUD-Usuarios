// Promesas
// Una promesa es un objeto que representa la eventual finalización (o falla) de una operación asíncrona y su valor resultante. Una promesa puede estar en uno de tres estados:

// 1. Pendiente: La operación aún no se ha completado.
// 2. Cumplida: La operación se ha completado exitosamente, y la promesa tiene un valor resultante.
// 3. Rechazada: La operación ha fallado, y la promesa tiene un motivo de rechazo (error).


// Importando la biblioteca 'mysql2' con 'promise' esta API de promesas ayuda al manejo de la funcion 'async' y el proceso 'await'
import mysql from 'mysql2/promise';

// createPool es una funcion de la biblioteca 'mysql2' la cual mantiene multiples conexiones abiertas lo que ayuda a ser capaz de responder a multiples solicitudes
export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_usuarios'
})