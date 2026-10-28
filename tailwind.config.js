/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06140e',
          900: '#0e261b',
          800: '#143828',
          700: '#1e4d38',
          600: '#2c694e',
          500: '#3d8866',
          100: '#e3efe8',
          50: '#f0f7f3',
        },
        charcoal: {
          950: '#0d1110',
          900: '#151918',
          800: '#212624',
          700: '#343b38',
          600: '#525c57',
          500: '#75807b',
        },
        parchment: {
          50: '#fcfbf8',
          100: '#f7f5ef',
          200: '#eee9dd',
          300: '#ded7c4',
        },
        hazard: {
          red: '#dc2626',
          amber: '#d97706',
          yellow: '#eab308',
          green: '#16a34a',
          blue: '#0284c7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
