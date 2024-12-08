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
        'header': '50',
        'overlay': '100',
        'modal': '200',
      },
      colors: {
        surface: {
          darker: '#131B2E',
          lighter: '#f1f1f1',
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
        accent: {
          primary: '#FFE900',
          secondary: '#A3EA71',
          tertiary: '#2628DD',
        },
        tekhelet: {
          base: '#2D1B69',
          light: '#432371',
          dark: '#1A103F',
        },
        
        status: {
          success: '#4CAF50',
          error: '#EF4444',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-tekhelet': 'linear-gradient(135deg, #2D1B69 0%, #714674 100%)',
      },
    },
  },
  plugins: [forms, typography],
} as const;

export default config;