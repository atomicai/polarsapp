/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#080C18',
        secondary: '#282836'
      },
      textColor: {
        primary: '#FDF731'
      }
    }
  },
  plugins: []
};
