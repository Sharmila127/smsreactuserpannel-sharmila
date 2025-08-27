import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/user/',   // 👈 User Panel app serve ஆகும் path (CloudFront → /user/)
  build: {
    outDir: 'dist',     // build output directory
    assetsDir: 'assets' // static assets directory
  }
})
