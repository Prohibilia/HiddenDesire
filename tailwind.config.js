/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#d4af37',
        burgundy: {
          900: '#50000C',
          800: '#690011',
          700: '#800015',
          600: '#9A001A',
          500: '#B4001F',
        },
        midnight: {
          900: '#0D0D0D',
          800: '#1A1A1A',
          700: '#262626',
          600: '#333333',
          500: '#404040',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
      },
      backgroundImage: {
        'damask-pattern': "url('/images/damask-pattern.jpg')",
      },
    },
  },
  plugins: [],
};