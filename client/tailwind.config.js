/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Josefin: "Josefin Sans",
    },
    extend: {
      colors: {
        main: "#20023e",
        secondary: "#9d3cff",
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
