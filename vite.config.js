import { defineConfig } from 'vite';
import { resolve } from 'path';

// For GitHub Pages project site: https://username.github.io/repo-name/
// Base should be '/repo-name/'
// For user/org site (username.github.io repo): base should be '/'
export default defineConfig({
  base: '/Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        resume: resolve(__dirname, 'resume.html'),
      },
    },
    // Ensure assets are properly referenced
    assetsDir: 'assets',
  },
});
