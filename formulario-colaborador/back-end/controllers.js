const express = require('express');
const cors = require('cors');
const controllers = express.Router();
const bodyParser = require('body-parser');
const { dbVacaciones, dbProspectos } = require('./dbConnections');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint usando dbVacaciones
app.post('/api/GetRFC', (req, res) => {
  const { rfc } = req.body;
  const query = 'SELECT * FROM empleados WHERE rfc = ?';

  dbVacaciones.query(query, [rfc], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });

    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.status(401).json({ success: false, error: 'RFC no encontrado' });
    }
  });
});


// Otro endpoint usando dbProspectos
app.post('/api/add-prospecto', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const date = new Date();
    let dateToday =date.toISOString().slice(0, 19).replace('T', ' ');
    const query = `INSERT INTO prospecto(fecha_registro,
        nombre_prospecto, apellido_paterno_prospecto, apellido_materno_prospecto,
        fecha_nacimiento, sexo, lugar_nacimiento, estado_civil, curp, rfc, nss, 
        umf, numero_cuenta, calle, numero_exterior, numero_interior, colonia, 
        codigo_postal, localidad, municipio, estado, numero_celular, telefono_casa, 
        correo_cfdi, escolaridad, hijos, nombre_padre, nombre_madre, tipo_sangre, 
        alergias, procedimientos_medicos, infonavit, fonacot, pension_alimenticia, id_detalles_puesto) VALUES 
        (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const values = [
        dateToday,  
        req.body.nombre_prospecto || null,
        req.body.apellido_paterno_prospecto || null,
        req.body.apellido_materno_prospecto || null,
        req.body.fecha_nacimiento || null,
        req.body.sexo || null,
        req.body.lugar_nacimiento || null,
        req.body.estado_civil || null,
        req.body.curp || null,
        req.body.rfc || null,
        req.body.nss || null,
        req.body.umf || null,
        req.body.numero_cuenta || null,
        req.body.calle || null,
        req.body.numero_exterior || null,
        req.body.numero_interior || null,
        req.body.colonia || null,
        req.body.codigo_postal || null,
        req.body.localidad || null,
        req.body.municipio || null,
        req.body.estado || null,
        req.body.numero_celular || null,
        req.body.telefono_casa || null,
        req.body.correo_cfdi || null,
        req.body.escolaridad || null,
        req.body.hijos || null,
        req.body.nombre_padre || null,
        req.body.nombre_madre || null,
        req.body.tipo_sangre || null,
        req.body.alergias || null,
        req.body.procedimientos_medicos || null,
        req.body.infonavit || null,
        req.body.fonacot || null,   
        req.body.pension_alimenticia === 'true' ? 1 : 0, 
        req.body.id_detalles_puesto || null
    ];

    console.log('Valores a insertar:', values);

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la inserción:', results);
        res.json({
            success: true,
            message: 'Prospecto agregado exitosamente',
            id: results.insertId,
            nombre: req.body.nombre_prospecto
        });
    });
});
    
app.post('/api/add-contacto-emergencia', (req, res) => {
    console.log('Datos recibidos:', req.body);

     const query = `INSERT INTO contacto_emergencia (nombre_contacto, telefono, parentesco) VALUES (?, ?, ?)`;

    const values = 
    [
        req.body.nombre_contacto || null,
        req.body.telefono || null,
        req.body.parentesco || null
    ] 
    
    console.log('Valores a insertar:', values); 

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la inserción:', results);
        res.json({
            success: true,
            message: 'Contacto de emergencia agregado exitosamente',
            id: results.insertId,
            nombre: req.body.nombre_contacto
        });
    });
});

app.post('/api/add-prospecto-contacto', (req, res) => {
    console.log('Datos recibidos:', req.body);

     const query = `INSERT INTO prospecto_contacto_emergencia (id_prospecto, id_contacto_emergencia) VALUES (?, ?)`;

    const values = 
    [
        req.body.id_prospecto || null,
        req.body.id_contacto_emergencia || null
    ] 
    
    console.log('Valores a insertar:', values); 

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la inserción:', results);
        res.json({
            success: true,
            message: 'Contacto de emergencia agregado exitosamente',
            id: results.insertId,
            nombre: req.body.nombre_contacto
        });
    });
});

//DELETE prospecto-contacto
app.delete('/api/delete-prospecto-contacto', (req, res) => {
    console.log('Datos recibidos:', req.body);

    const query = `DELETE FROM prospecto_contacto_emergencia WHERE id_prospecto = ? AND id_contacto_emergencia = ?`;

    const values = 
    [
        req.body.id_prospecto || null,
        req.body.id_contacto_emergencia || null
    ] 

    console.log('Valores a eliminar:', values);

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la eliminación:', results);
        res.json({
            success: true,
            message: 'Contacto de emergencia eliminado exitosamente',
            id: req.body.id_contacto_emergencia
        });
    });
});


//DELETE contacto-emergencia
app.post('/api/delete-contacto-emergencia', (req, res) => {
    console.log('Datos recibidos:', req.body);

    const query = `DELETE FROM contacto_emergencia WHERE id = ?`;

    const values = 
    [
        req.body.id_contacto_emergencia || null
    ];

    console.log('Valores a eliminar:', values);

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la eliminación:', results);
        res.json({
            success: true,
            message: 'Contacto de emergencia eliminado exitosamente',
            id: req.body.id_contacto_emergencia
        });
    });
});


//DELETE prospecto
app.post('/api/delete-prospecto', (req, res) => {
    console.log('Datos recibidos:', req.body);
    const query = `DELETE FROM prospecto WHERE id = ?`;
    const values = [req.body.id || null];

    console.log('Valores a eliminar:', values);

    dbProspectos.query(query, values, (error, results) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor: ' + error.message,
                sqlError: error.sqlMessage,
                sql: error.sql
            });
        }

        console.log('Resultado de la eliminación:', results);
        res.json({
            success: true,
            message: 'Prospecto eliminado exitosamente',
            id: req.body.id
        });
    });
});


app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

module.exports = controllers;
