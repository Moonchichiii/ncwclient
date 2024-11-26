/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Monochromatic base
        mono: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // New gradient colors
        tekhelet: {
          base: '#432371',
          shade2: '#4B2972',
          shade3: '#522F72',
          eminence: '#5A3573',
          finn: '#623A73',
          shade4: '#694074',
          shade5: '#714674',
        },
        // Accent colors (used sparingly)
        accent: {
          gold: '#CBB26A',
          blue: '#0466C8',
          ice: '#E0F4FF',
        },
        // Semantic colors
        success: '#4CAF50',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('/noise.png')",
        'gradient-mono': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-tekhelet': 'linear-gradient(135deg, #432371 0%, #714674 100%)',
        'gradient-tekhelet-vertical': 'linear-gradient(180deg, #432371 0%, #714674 100%)',
        'gradient-tekhelet-radial': 'radial-gradient(circle, #432371 0%, #714674 100%)',
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll': 'scroll 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
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
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}