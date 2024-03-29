/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0.5': '0.5px',
      '0': '0',
      '2': '2px',
      '3': '3px',
    },
    extend: {
      fontFamily: {
        'sans-l':  'open-sans-light',
        'sans-r':  'open-sans-regular',
        'sans-sm': 'open-sans-semibold',
        'sans-b':  'open-sans-bold',
      },
      colors: {
        'black-rgba':     'rgba(0,0,0,0.7)',
        'black-rgba-0.5': 'rgba(0,0,0,0.5)'
      }
    },
  },
  plugins: [],
}

