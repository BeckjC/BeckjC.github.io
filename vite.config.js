import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react-vendor'
          if (
            id.includes('d3-geo') ||
            id.includes('d3-selection') ||
            id.includes('d3-zoom') ||
            id.includes('topojson-client') ||
            id.includes('world-atlas')
          ) {
            return 'map-vendor'
          }
        },
      },
    },
  },
})
