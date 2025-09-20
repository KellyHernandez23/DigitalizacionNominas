// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const routes = require('./controllers');


// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Usar las rutas
// app.use(routes);

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor ejecutándose en http://localhost:${port}`);
// });


// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const routes = require('./controllers');
// const path = require('path'); 

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// // Servir archivos estáticos con MIME types correctos
// app.use('/front-end', express.static(path.join(__dirname, '../front-end'), {
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith('.js')) {
//       res.setHeader('Content-Type', 'application/javascript');
//     }
//     if (filePath.endsWith('.css')) {
//       res.setHeader('Content-Type', 'text/css');
//     }
//   }
// }));

// // Servir el build de producción si existe
// app.use(express.static(path.join(__dirname, '../front-end/dist'), {
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith('.js')) {
//       res.setHeader('Content-Type', 'application/javascript');
//     }
//     if (filePath.endsWith('.css')) {
//       res.setHeader('Content-Type', 'text/css');
//     }
//   }
// }));

// // Ruta para servir el frontend
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front-end/index.html'));
// });

// // Usar las rutas de la API
// app.use('/api', routes); // ← Es buena práctica prefijar las rutas de API

// // Iniciar el servidor
// app.listen(port, () => {
//   console.log(`Servidor ejecutándose en http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./controllers');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// VERIFICAR si existe la carpeta dist (build de producción)
const hasBuild = fs.existsSync(path.join(__dirname, '../front-end/dist'));

// Configuración para servir archivos estáticos
if (hasBuild) {
  // En producción: servir desde dist
  app.use(express.static(path.join(__dirname, '../front-end/dist'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
} else {
  // En desarrollo: servir desde src
  app.use('/src', express.static(path.join(__dirname, '../front-end/src'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
  
  // Servir también archivos estáticos de public
  app.use(express.static(path.join(__dirname, '../front-end/public'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
}

// Ruta para API
app.use('/api', routes);

// Para React Router: todas las rutas no-API sirven el index.html
app.get('*', (req, res) => {
  if (hasBuild) {
    res.sendFile(path.join(__dirname, '../front-end/dist/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../front-end/public/index.html'));
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
  console.log(hasBuild ? 'Modo producción (dist)' : 'Modo desarrollo (src)');
});