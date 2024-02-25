/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans-l':  'open-sans-light',
        'sans-r':  'open-sans-regular',
        'sans-sm': 'open-sans-semibold',
        'sans-b':  'open-sans-bold',
      },
      colors: {
        'black-rgba': 'rgba(0,0,0,0.7)'
      }
    },
  },
  plugins: [],
}

