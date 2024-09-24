/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brownlogo: '#693705', 
        brownText: '#593B34', 
        greenCastomize: '#1e6a6e',
        yellowCastomize: '#F5CF82', 
        blueCastomize: '#0a65cc', 
        redCastomize: '#C67265', 
        baseCastomize: '#F2E3D1', 
      },
      fontFamily: {
        noto: "'Noto Sans', sans-serif", 
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
