/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      rob: "Roboto",
    },
    extend: {
      colors: {
        main: "#FAFAFB",
        secondary: "#0e9507b3",

        darkWhite: "#f6f6f6",
        mainColor: "#2B2B3A",
        mainBlue: "#0075ff",
      },
      keyframes: {
        moveLeft: {
          "0%": { translate: "2000px" },
          "100%": { translate: "initial" },
        },
      },
      animation: {
        "waving-left": "moveLeft 2s   forwards",
      },
    },
  },
  plugins: [],
};
