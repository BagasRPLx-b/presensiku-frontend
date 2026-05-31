import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Menaikkan batas toleransi ukuran file dari 500kB menjadi 1600kB (1.6MB)
    chunkSizeWarningLimit: 1600,
  },
})