import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  build: {
    // Optimizaciones de build
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
        },
      },
    },
    // Optimizar tamaño de chunks
    chunkSizeWarningLimit: 1000,
    // Minificación
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remover console.log en producción
        drop_debugger: true,
      },
    },
  },
  
  // Optimizaciones de servidor de desarrollo
  server: {
    warmup: {
      // Pre-cargar módulos críticos
      clientFiles: [
        './src/App.jsx',
        './src/components/Header/Header.jsx',
      ],
    },
  },
})
