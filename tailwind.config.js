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
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}