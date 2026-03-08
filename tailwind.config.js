/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C6CCB',
        deep: '#1E3A8A',
        mid: '#3F8FD8',
        accent: '#4ED6F1',
        background: '#F6FAFD',
        text: '#1F2937',
        surface: '#EDF4FC',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-davinci': 'linear-gradient(135deg, #1E3A8A, #2C6CCB, #4ED6F1)',
        'gradient-davinci-hover': 'linear-gradient(135deg, #4ED6F1, #2C6CCB, #1E3A8A)',
        'gradient-subtle': 'linear-gradient(180deg, #F6FAFD, #EDF4FC)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
