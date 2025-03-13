/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        lora: ["Lora", "serif"],
        playfair: ["Playfair Display", "serif"],
      },
      colors: {
        background: "#1E1E1E",
        primary: "#2E8B57",
        accent: "#8FBC8F",
        white: "#FFFFFF",
        secondary: "#454545",
        tetiary: "#e0e0e0",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1025px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
