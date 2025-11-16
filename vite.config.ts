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
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation libraries
          'vendor-motion': ['framer-motion'],
          // Smooth scrolling
          'vendor-lenis': ['lenis'],
          // UI components (Radix UI primitives)
          'vendor-ui': ['@radix-ui/react-slot'],
          // Icons
          'vendor-icons': ['lucide-react'],
          // Utility libraries
          'vendor-utils': ['class-variance-authority', 'clsx', 'tailwind-merge'],
          // Mermaid is now lazy-loaded on demand, so it won't be in the main bundle
        },
      },
    },
    // Minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Increase chunk size warning limit (Mermaid is large but lazy-loaded)
    chunkSizeWarningLimit: 600,
  },
});
