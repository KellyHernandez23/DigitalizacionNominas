// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Configuración de la conexión a MySQL
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',      
//   password: 'root', 
//   database: 'app_vacaciones' 
// });

// // Conectar a la base de datos
// db.connect((err) => {
//   if (err) {
//     console.error('Error conectando a la base de datos:', err);
//     return;
//   }
//   console.log('Conectado a la base de datos MySQL');
// });


// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
//   }

//   // Consulta para verificar las credenciales
//   const query = 'SELECT * FROM empleados WHERE id = ? AND passw = ?';
  
//   db.query(query, [username, password], (err, results) => {
//     if (err) {
//       console.error('Error al ejecutar la consulta:', err);
//       return res.status(500).json({ error: 'Error del servidor' });
//     }

//     if (results.length > 0) {
//       // Usuario autenticado correctamente
//       res.json({ 
//         success: true, 
//         message: 'Login exitoso',
//         user: {
//           id: results[0].id,
//           nombre: results[0].nombre,
//           apellidoP: results[0].apellido_paterno,
//           puesto: results[0].puesto
//         }
//       });
//     } else {
//       // Credenciales incorrectas
//       res.status(401).json({ 
//         success: false, 
//         error: 'Usuario o contraseña incorrectos' 
//       });
//     }
//   });
// });


// Ruta para obtener colaboradores
// app.get('/api/colaboradores', (req, res) => {
//   const query = 'SELECT * FROM empleados'; 
  
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error('Error al ejecutar la consulta:', err);
//       res.status(500).send('Error del servidor');
//       return;
//     }
//     res.json(results);
//   });
// });

// Ruta para insertar colaboradores
// app.post('/api/colaboradores', (req, res) => {
  // Ajusta estos campos según tu formulario
//   const { nombre, email, telefono, departamento } = req.body;
//   const query = 'INSERT INTO colaboradores (nombre, email, telefono, departamento) VALUES (?, ?, ?, ?)';
  
//   db.query(query, [nombre, email, telefono, departamento], (err, results) => {
//     if (err) {
//       console.error('Error insertando datos:', err);
//       res.status(500).send('Error del servidor');
//       return;
//     }
//     res.status(201).json({ message: 'Colaborador creado correctamente', id: results.insertId });
//   });
// });


// dbConnections.js
const mysql = require('mysql2');

const dbVacaciones = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'app_vacaciones'
});

const dbProspectos = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'prospectos'
});

dbVacaciones.connect(err => {
  if (err) console.error('Error conectando a app_vacaciones:', err);
  else console.log('Conectado a app_vacaciones');
});

dbProspectos.connect(err => {
  if (err) console.error('Error conectando a prospectos:', err);
  else console.log('Conectado a prospectos');
});

module.exports = {
  dbVacaciones,
  dbProspectos
};
