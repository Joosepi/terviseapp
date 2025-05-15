/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary:  '#222831',
        secondary: '#393E46',
        accent: '#948979',
        beige: '#DFD0B8',
      },
    },
  },
  plugins: [],
} 