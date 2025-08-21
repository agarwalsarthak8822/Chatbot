import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base to repo name for GitHub Pages: https://<user>.github.io/<repo>/
  base: '/Chatbot/',
  build: {
    outDir: 'docs',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
