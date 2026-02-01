/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'm-beige': '#F5F2ED',  // Light Cream (Background ke liye)
        'm-brown': '#3E2723',  // Dark Coffee (Text aur Footer ke liye)
        'm-olive': '#556B2F',  // Premium Green (Buttons/Accents ke liye)
        'm-gold':  '#D4AF37',  // Royal Gold (Borders/Icons ke liye)
        'm-gray':  '#F9FAFB',  // Very Light Gray (Input fields ke liye)
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'], // Headings ke liye
        montserrat: ['"Montserrat"', 'sans-serif'], // Body text ke liye
      },
      boxShadow: {
        'luxury': '0 20px 40px -10px rgba(62, 39, 35, 0.1)', // Soft brown shadow
      }
    },
  },
  plugins: [],
}