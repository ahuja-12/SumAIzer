import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // optional, makes dev URL consistent
  },
  build: {
    outDir: 'dist', // default for Vite
  },
})

