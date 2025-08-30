import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'd9dca8aa070e.ngrok-free.app', // ← tu dominio específico de ngrok
      '.ngrok-free.app' // ← o permite todos los dominios de ngrok
    ]
  },
  plugins: [react()],
})