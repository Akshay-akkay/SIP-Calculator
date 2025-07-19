/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          '50': '#f0f8ff',
          '100': '#e0f0fe',
          '200': '#c2e3fe',
          '300': '#93d3fd',
          '400': '#5dbafd',
          '500': '#3b9ef8',
          '600': '#2580f2',
          '700': '#1c68e4',
          '800': '#1a53b8',
          '900': '#1c4890',
          '950': '#162c57',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
