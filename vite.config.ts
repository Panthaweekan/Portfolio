import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// For GitHub Pages project site: https://username.github.io/repo-name/
// Base should be '/repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
