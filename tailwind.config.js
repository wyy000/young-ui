const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors,
      spacing: {
        page: '1200px',
        '1/2h': '50vh',
        '2/3h': '66vh',
      },
      animation: {
        'line-move': 'svgAnts 50s linear infinite',
      }
    },
  },
  variants: {
    borderColor: ['group-hover', 'hover', 'focus'],
    borderWidth: ['first'],
    borderStyle: ['hover'],
    boxShadow: ['hover', 'focus', 'active'],
    cursor: ['group-hover', 'hover', 'disabled'],
    display: ['group-hover'],
    margin: ['last'],
    opacity: ['group-hover', 'disabled'],
    textColor: ['group-hover', 'hover', 'focus', 'disabled'],
    translate: ['active'],
    visibility: ['group-hover'],
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
