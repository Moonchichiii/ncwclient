// tailwind.config.js
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      zIndex: {
        'base': '0',
        'header': '9999', 
        
        'modal': '200',
      },
      colors: {
        surface: {
          darker: '#131B2E',
          lighter: '#F7F9FC',
          card: {
            light: '#FFFFFF',
            dark: 'rgba(19, 27, 46, 0.8)',
          }
        },
        mono: {
          50: '#FFFFFF',
          100: '#F4F4F4',
          200: '#E1E2E2',
          300: '#CACACA',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#6B21A8',
          800: '#5B18A3',
          900: '#4C127E',
          950: '#0F172A',
        },
        theme: {
          light: {
            bg: '#F7F9FC',
            text: '#1A1A1A',
            accent: '#432371',
            hover: '#8655CA', 
          },
          dark: {
            bg: '#131B2E',
            text: '#FFFFFF',
            accent: '#8655CA',
            hover: '#A881E6', 
          }
        },
        accent: {
          primary: '#432371',
          secondary: '#8655CA',
          tertiary: '#2628DD',
          hover: '#A881E6', 
        },
        tekhelet: {
          base: '#2D1B69',
          light: '#432371',
          dark: '#1A103F',
          hover: '#8655CA', 
          'hover-dark': '#A881E6', 
        },
        status: {
          success: '#4CAF50',
          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'], 
        body: ['Roboto', 'sans-serif'], 
      },
    
    },
  },
  plugins: [forms, typography],
} as const;

export default config;
