/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'secondary': '#023047',
        'primary' : '#FB8500',
        'secondary-2' : '#F2E9E4',
        'secondary-hover' : '#C9ADA7'
      },
    },
  },
  plugins: [],
}