/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#E0F2FE', // Twój jasnoniebieski (tło nagłówka)
          DEFAULT: '#0284C7', // Główny niebieski
          dark: '#0C4A6E',    // Ciemny tekst
        },
        secondary: '#F59E0B', // Opcjonalny pomarańczowy akcent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // To nadpisze domyślną czcionkę na Inter
      }
    },
  },
  plugins: [],
}