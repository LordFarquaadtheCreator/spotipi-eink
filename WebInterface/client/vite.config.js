import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Use the key as the prefix to match for the proxy
      '/auth': {
        target: 'http://localhost:4000', // Your backend address
        changeOrigin: true, // Needed for virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the path (optional)
      },
      // ...you can add more proxies here if needed
    },
  },
  plugins: [react()],
})
