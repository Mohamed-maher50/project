/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Josefin: "Josefin Sans",
    },
    extend: {
      colors: {
        main: "#BAD7DF",
        secondary: "#ffe2e2",
        open: "#99ddcc",
        darkWhite: "#f6f6f6",
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
