const mysql = require('mysql2');

//CONFIRGURACIÓN LOCAL
// const dbVacaciones = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'app_vacaciones'
// });

// const dbProspectos = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'prospectos'
// });

//CONFIRGURACIÓN PRODUCCIÓN
const dbVacaciones = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'app_vacaciones'
});

const dbProspectos = mysql.createConnection({
  host: 'localhost',
  user: 'ti_prospecto_user',
  password: 'Ti_prospectos',
  database: 'ti_prospectos'
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
