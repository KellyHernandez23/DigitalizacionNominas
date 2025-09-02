const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./controllers');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Usar las rutas
app.use(routes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
