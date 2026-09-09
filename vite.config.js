import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js into its own chunk so the main app bundle stays small
          'three-vendor': ['three'],
          // Split React and router into a stable vendor chunk for caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    // Raise chunk size warning threshold
    chunkSizeWarningLimit: 1000,
  }
})

