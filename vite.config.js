import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['express'], // Tell Rollup to ignore express
      onwarn(warning, warn) {
        // Ignore specific warnings
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.source === 'express') {
          return
        }
        warn(warning)
      }
    }
  },
  optimizeDeps: {
    exclude: ['express'] // Exclude from dependency optimization
  }
})