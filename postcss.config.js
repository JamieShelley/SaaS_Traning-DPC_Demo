
// https://gist.github.com/bradtraversy/1c93938c1fe4f10d1e5b0532ae22e16a

const tailwindcss = require('tailwindcss');

module.exports = {
  output: "export",
  plugins: {
     tailwindcss: {
       config: './tailwind.config.js'
     },
    autoprefixer: {},
  },
}
