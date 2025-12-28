import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// For GitHub Pages project site: https://username.github.io/repo-name/
// Base should be '/repo-name/'

// Custom plugin to redirect routes without trailing slashes (preview only)
// Note: Disabled for dev server to avoid conflicts with Vite internals
function trailingSlashPlugin() {
  const middleware = (req: { url: string; }, res: { writeHead: (arg0: number, arg1: { Location: string; }) => void; end: () => void; }, next: () => void) => {
    const url = req.url || '';
    
    // Skip any internal/asset paths
    if (url.startsWith('/@') || 
        url.startsWith('/__') ||
        url.includes('node_modules') ||
        url.includes('?') ||
        url.startsWith('/src')) {
      next();
      return;
    }
    
    // Handle /Portfolio without trailing slash
    if (url === '/Portfolio') {
      res.writeHead(301, { Location: '/Portfolio/' });
      res.end();
      return;
    }
    // Handle routes under /Portfolio/ that aren't static assets
    if (url.startsWith('/Portfolio/') && 
        !url.endsWith('/') && 
        !url.includes('.')) {
      res.writeHead(301, { Location: url + '/' });
      res.end();
      return;
    }
    next();
  };

  return {
    name: 'trailing-slash-redirect',
    // Only enable for preview server (production build)
    configurePreviewServer(server: { middlewares: { use: (arg0: (req: any, res: any, next: any) => void) => void; }; }) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [react(), trailingSlashPlugin()],
  base: '/Portfolio/',
  appType: 'spa', // Proper SPA fallback handling
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
          // 3D Graphics (lazy-loaded via ThreeBackground)
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // Animation library (used in Projects)
          'vendor-gsap': ['gsap', '@gsap/react'],
          // UI components (Radix UI primitives)
          'vendor-ui': ['@radix-ui/react-slot'],
          // Icons
          'vendor-icons': ['lucide-react'],
          // Utility libraries
          'vendor-utils': ['class-variance-authority', 'clsx', 'tailwind-merge'],
          // Mermaid is lazy-loaded on demand
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
