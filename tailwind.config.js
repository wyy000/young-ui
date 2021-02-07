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
      },
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
