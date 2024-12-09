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
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'gsap-core': ['gsap'],
          'gsap-plugins': [
            'gsap/ScrollTrigger',
            'gsap/ScrollToPlugin',
            'gsap/TextPlugin',
            'gsap/CustomEase',
            'gsap/MotionPathPlugin'
          ],
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
      // Block GSAP registration attempts
      '^https://gsap.com/.*': {
        target: 'about:blank',
        changeOrigin: true,
        secure: false
      },
      // Block any URLs containing 'gsap' or 'greensock'
      '.*(?:gsap|greensock).*': {
        target: 'about:blank',
        changeOrigin: true,
        secure: false
      }
    }
  }
});