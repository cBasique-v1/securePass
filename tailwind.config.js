/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./scripts/**/*.js, ./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Oswald', 'sans-serif'],
      },
      colors: {
        'blue_sky': {
          100: '#39C4FF',
          200: '#1865FB',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
  ],
}

