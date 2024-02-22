/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  
  theme: {
    
    container: {
      center: true,
    },
    extend: {
      animation: {
        'fadein': 'fadein 1s ease-in-out',
        'fadeInFast': 'fadeInFast 0.2s ease-in-out',
        
      },
      keyframes: {
        'fadein': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        }, fadeInFast: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        
      },
      colors: {
        orange: "#D64D00",
        black: "#121212",
        gray: "#505050",
        indigo: "#5C59D4",
        lavender: "#EDEDFF",
        peach: "#FFEBD8",
        whitesmoke: "#F5F5F5",
        coolGray: "#A2A3B1",
        spaceCadet: "#17183B",
      },
      fontFamily: {
        Rubik: ["Rubik", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Proxima: ["Proxima Nova", "sans-serif"],
      }
    },
  },
  
  plugins: [require("daisyui"),require('tailwind-scrollbar'),],
}
