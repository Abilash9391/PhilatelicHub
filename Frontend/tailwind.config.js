/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "serif"],
        raleway: ["Raleway", "sans-serif"],
        lora: ["Lora", "serif"],
        playfair: ["Playfair Display", "serif"],
        libre: ["Libre Caslon Display", "serif"],
      },
      colors: {
        background: "#1E1E1E",
        primary: "#2E8B57",
        accent: "#8FBC8F",
        white: "#FFFFFF",
        secondary: "#454545",
        tetiary: "#e0e0e0",
        moonmist: "#DADDD0",
        blueribbon: "#364CE4",
        explosivegrey: "#cdcdcd",
        latergator: "#028B53",
        alterego: "#69686d",
        gramshair: "#F5F6F8",
        raisinblack: "#1E1F23",
        orange: "#D87D4A",
        pink: "#fbaf85",
        grey: "#F1F1F1",
        lightgrey: "#FAFAFA",
        fullblack: "#000000",
        black: "#101010",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "10px",
          md: "15px",
          lg: "20px",
          // sm:'32px',
          // md:'40px',
          // lg:'165px',
        },
      },
    },
  },
  plugins: [],
};
