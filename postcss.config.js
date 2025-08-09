// PostCSS configuration for Tailwind CSS.
//
// Next.js automatically picks up this file to build Tailwind styles.
module.exports = {
  plugins: {
    // Use the new Tailwind PostCSS plugin. See https://tailwindcss.com/docs/installation
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};