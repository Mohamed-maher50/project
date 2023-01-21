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
    },
  },
  plugins: [],
};
