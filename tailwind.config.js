/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#030803',
        'background': '#f0fbef',
        'primary': '#38de2d',
        'secondary': '#83f57b',
        'accent': '#48fe3b',
       },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms')],
}