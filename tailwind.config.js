/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
      },
      backgroundColor:{
primary:'#1E3A5F'
      },
      listStyleType: {
        square: 'square',  // Adds 'square' as a valid option for listStyleType
      },
    },
  },
  plugins: [],
}