import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests to the backend server
      // Example: All requests to '/api' will be proxied to 'http://localhost:8080'
      '/api': {
        target: 'http://localhost:9000', // Backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // If you're using https, you might need to set this to false
        // Path rewrite is optional. Use it if you want to remove the base path.
        // For example, rewrite '/api/test' to '/test' before the request is sent.
        rewrite: (path) => path.replace(/^\/api/, '/api/v1/'),
      },
      // You can add more proxy rules here
    },
  },
})
