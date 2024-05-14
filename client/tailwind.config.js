module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4E8397',
        'custom-gold': '#BA814F',
        'custom-cream': '#E7D0BF',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'], // Preserving existing serif setup
        'sans': ['Poppins', 'Roboto', 'sans-serif'], // Updating sans-serif setup to 'Poppins' and 'Roboto'
      },
    },
  },
  variants: {
extend: {},
  },
  plugins: [],
}

//https://www.softr.io/tools/svg-shape-generator