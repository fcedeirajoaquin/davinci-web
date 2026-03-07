/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Da Vinci Official Brand Colors
        primary: '#2C6CCB',      // Primary Blue
        deep: '#1E3A8A',         // Deep Blue (navbar, footer)
        mid: '#3F8FD8',          // Mid Blue (backgrounds)
        accent: '#4ED6F1',       // Accent Cyan (hover, highlights)
        background: '#F6FAFD',   // Light background
        text: '#1F2937',         // Text color
      },
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-davinci': 'linear-gradient(135deg, #1E3A8A, #2C6CCB, #4ED6F1)',
        'gradient-davinci-hover': 'linear-gradient(135deg, #4ED6F1, #2C6CCB, #1E3A8A)',
      },
    },
  },
  plugins: [],
}
