// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     headers: {
//       'Content-Type': 'application/javascript'
//     },
//     host: '0.0.0.0',
//     port: 5173,
//     allowedHosts: [
//       'd9dca8aa070e.ngrok-free.app', // ← tu dominio específico de ngrok
//       '.ngrok-free.app' // ← o permite todos los dominios de ngrok
//     ]
//   },
//   plugins: [react()],
// })

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { resolve } from 'path'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     // Configuración importante para desarrollo
//     middlewareMode: false,
//     // Headers para MIME types correctos
//     headers: {
//       'Content-Type': 'application/javascript'
//     }
//   },
//   // Configuración de build importante
//   build: {
//     outDir: 'dist',
//     sourcemap: true,
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html')
//       },
//       output: {
//         // Asegurar que los archivos tengan extensión .js
//         entryFileNames: 'assets/[name].js',
//         chunkFileNames: 'assets/[name].js',
//         assetFileNames: 'assets/[name].[ext]'
//       }
//     }
//   },
//   // Resolución de rutas
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src')
//     }
//   }
// })

// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'
// import { resolve } from 'path'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')

// return {
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0',
//     port: 5173,
//     headers: {
//       'Content-Type': 'application/javascript'
//     },
//     proxy: {
//       '/api': {
//         target: 'http://localhost', // O la URL donde sirves tu PHP
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '/back-end/api'),
//         configure: (proxy, options) => {
//           // Configuración adicional si necesitas
//           proxy.on('error', (err, req, res) => {
//             console.log('Proxy error:', err);
//           });
//         }
//       }
//     }
//   },
//   build: {
//     rollupOptions: {
//       external: [
//         /\.\.\/back-end/,
//         /back-end\/Hooks/,
//         /useSatData/,
//         /[Cc]:\\Repos\\DigitalizacionNominas\\formulario-colaborador\\back-end/
//       ],
//       output: {
//         entryFileNames: 'assets/[name].js',
//         chunkFileNames: 'assets/[name].js',
//         assetFileNames: 'assets/[name].[ext]'
//       }
//     }
//   },
//   ssr: {
//     noExternal: [/\.*/],
//     external: ['../back-end/**']
//   },
//   optimizeDeps: {
//     exclude: [
//       '../back-end/**',
//       '**/back-end/**',
//       'useSatData'
//     ]
//   }
// }})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost/DigitalizacionNominas/formulario-colaborador/back-end',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})