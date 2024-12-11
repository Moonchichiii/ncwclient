import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@config', replacement: path.resolve(__dirname, 'src/config') },
    ]
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'gsap-core': ['gsap'],
          'gsap-plugins': [
            'gsap/ScrollTrigger',
            'gsap/ScrollToPlugin',
            'gsap/TextPlugin',
            'gsap/CustomEase',
            'gsap/MotionPathPlugin'
          ],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-slot'],
          'forms': ['react-hook-form', '@hookform/resolvers/zod']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'gsap',
      'gsap/ScrollTrigger',
      'gsap/ScrollToPlugin',
      'gsap/TextPlugin',
      'gsap/CustomEase',
      'gsap/MotionPathPlugin'
    ],
    exclude: ['gsap/umd']
  },
  esbuild: {
    loader: 'tsx',
    include: ['src/**/*.tsx', 'src/**/*.ts'],
  },
  server: {
    host: true,
    proxy: {
      '^https://gsap.com/.*': {
        target: 'about:blank',
        changeOrigin: true,
        secure: false
      },
      '.*(?:gsap|greensock).*': {
        target: 'about:blank',
        changeOrigin: true,
        secure: false
      }
    }
  }
});