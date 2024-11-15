/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}" // Include all JS/TS/JSX/TSX files in src
  ],
  theme: {
    fontFamily: {
      sora: ["Sora", "sans-serif"]
    }
  },
  plugins: []
};
