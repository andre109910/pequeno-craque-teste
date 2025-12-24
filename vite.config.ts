import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            // React core - deve ser carregado primeiro
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            // React Router - depende do React
            if (id.includes('react-router')) {
              return 'vendor-react';
            }
            // Radix UI components - depende do React
            if (id.includes('@radix-ui')) {
              return 'vendor-react';
            }
            // Tanstack Query - depende do React
            if (id.includes('@tanstack')) {
              return 'vendor-react';
            }
            // Outras bibliotecas React
            if (id.includes('lucide-react') || id.includes('sonner') || id.includes('vaul') || 
                id.includes('cmdk') || id.includes('embla-carousel-react') || 
                id.includes('react-hook-form') || id.includes('react-day-picker')) {
              return 'vendor-react';
            }
            // Utilities que não dependem do React
            if (id.includes('clsx') || id.includes('tailwind-merge') || 
                id.includes('class-variance-authority') || id.includes('date-fns') ||
                id.includes('zod')) {
              return 'vendor-utils';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    // Minification and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info'] : [],
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Source maps only in dev
    sourcemap: mode === 'development',
  },
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.webp'],
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['@fontsource/inter', '@fontsource/oswald'],
  },
}));
