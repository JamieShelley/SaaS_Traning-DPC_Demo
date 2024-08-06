const colors = require('tailwindcss/colors');


module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{ts,tsx,html,js,css}",
    "./node_modules/**/*.{ts,tsx,html,js,css}",
    "**/*.{ts,tsx,html,js,css}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  // important: '#__next',
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('tailwindcss/colors'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-filters'),
    require('@vechaiui/core')({ colors: ['orange'] })
  ],
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        orange: colors.orange,
        chino: {
          50: '#fcfcfb',
          100: '#f9f9f6',
          200: '#f0f0e9',
          300: '#e7e7db',
          400: '#d5d4c1',
          500: '#c3c2a6',
          600: '#b0af95',
          700: '#92927d',
          800: '#757464',
          900: '#605f51'
        },
        shark: {
          50: '#f4f4f4',
          100: '#e8e9ea',
          200: '#c7c7ca',
          300: '#a5a6a9',
          400: '#616369',
          500: '#1d2029',
          600: '#1a1d25',
          700: '#16181f',
          800: '#111319',
          900: '#0e1014'
        },
        'teal-blue': {
          50: '#f3f6f7',
          100: '#e6eef0',
          200: '#c1d4d9',
          300: '#9bb9c2',
          400: '#518595',
          500: '#065167',
          600: '#05495d',
          700: '#053d4d',
          800: '#04313e',
          900: '#032832'
        },
        midnight: {
          50: '#f2f3f5',
          100: '#e6e7ea',
          200: '#c0c4cb',
          300: '#9aa0ac',
          400: '#4f596d',
          500: '#03122f',
          600: '#03102a',
          700: '#020e23',
          800: '#020b1c',
          900: '#010917'
        }
      },
      width: {
        100: '100px',
        200: '200px',
        300: '300px',
        400: '400px'
      }
    }
  },
  // xwind options
  xwind: {
    mode: 'objectstyles'
  }
};
