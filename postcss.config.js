const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
    //Only add purgecss in production
    process.env.NODE_ENV === 'production' ? purgecss({
      content: [
        './src/**/*.vue',
        './public/**/*.html',
        './src/**/*.js'
      ],
      // Include any special characters you're using in this regular expression
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }) : ''
  ]
}
