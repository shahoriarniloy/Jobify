/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brownlogo: '#693705', // 
        brownText: '#593B34', 
        greenCastomize: '#1e6a6e',
        yellowCastomize: '#F5CF82', 
        blueCastomize: '#629BAD', 
        redCastomize: '#C67265', 
        // 
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};

