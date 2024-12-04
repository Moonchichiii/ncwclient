import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          dark: '#6a6969',
          darker: '#131B2E',
          lighter: '#223051',
        },
        mono: {
          50: '#FFFFFF',
          100: '#F4F4F4',
          200: '#E1E2E2',
          300: '#CACACA',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#353535',
          800: '#1F1F1F',
          900: '#181818',
          950: '#0F172A',
        },
        accent: {
          primary: '#FFE900',
          'primary-light': '#F05E3F',
          'primary-dark': '#D13315',
          secondary: '#A3EA71',
          'secondary-light': '#B4FF82',
          'secondary-dark': '#8ED161',
          tertiary: '#2628DD',
          'tertiary-light': '#3F42FF',
          'tertiary-dark': '#1D1FAD',
          yellow: '#FFE900',
          blue: '#2628DD',
          neon: '#A3EA71',
        },
        metallic: {
          light: '#CACACA',
          base: '#A3A3A3',
          dark: '#858585',
        },
        tekhelet: {
          base: '#2D1B69',
          light: '#432371',
          dark: '#1A103F',
          shade2: '#4B2972',
          shade3: '#522F72',
          shade4: '#694074',
          shade5: '#714674',
        },
        status: {
          success: '#4CAF50',
          error: '#EF4444',
          warning: '#F59E0B',
        }
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
        'gradient-dark': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-tekhelet': 'linear-gradient(135deg, #2D1B69 0%, #714674 100%)',
        'gradient-elegant': 'linear-gradient(to bottom right, #1A2238 0%, #131B2E 50%, #1A103F 100%)',
        'gradient-primary': 'linear-gradient(135deg, #E94823 0%, #F05E3F 100%)',
        'gradient-accent': 'linear-gradient(135deg, #A3EA71 0%, #B4FF82 100%)',
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scroll: 'scroll 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -5%)' },
          '20%': { transform: 'translate(-10%, 5%)' },
          '30%': { transform: 'translate(5%, -10%)' },
          '40%': { transform: 'translate(-5%, 15%)' },
          '50%': { transform: 'translate(-10%, 5%)' },
          '60%': { transform: 'translate(15%, 0)' },
          '70%': { transform: 'translate(0, 10%)' },
          '80%': { transform: 'translate(-15%, 0)' },
          '90%': { transform: 'translate(10%, 5%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
      },
    },
  },
  plugins: [forms, typography],
} as const;

export default config;
