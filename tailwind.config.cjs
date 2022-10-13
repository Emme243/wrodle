/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '350px',
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        dark: '#262B3C',
        gray: '#939B9F',
        green: '#66A060',
        yellow: '#CEB02C',
        'modal-light': "#f3f3f3",
        'modal-dark': "#262b3c",
      }
    }
  },
  plugins: []
};
