// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // Needed for Docker
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://backend:5000', // Points to backend service in Docker
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ''), // Removes /api before sending
//       },
//     },
//   },
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker to map ports correctly
    strictPort: true,
    port: 5173, 
    proxy: {
      // 1. Capture any request starting with "/api"
      '/api': {
        // 2. Forward it to the backend container
        target: 'http://backend:5000', 
        changeOrigin: true,
        secure: false,
        // 3. Remove "/api" prefix so backend gets "/nasa/asteroids" instead of "/api/nasa/asteroids"
        rewrite: (path) => path.replace(/^\/api/, ''), 
      },
    },
  },
})