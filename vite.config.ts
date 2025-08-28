import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Use './' for relative paths so it works on S3/CloudFront
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',       // Output folder for build
    assetsDir: 'assets',  // Folder for static assets inside dist
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'],
    force: true,
  },
});
