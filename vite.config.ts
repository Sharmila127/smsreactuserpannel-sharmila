export default defineConfig({
  base: '/',   // Serve at root
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
