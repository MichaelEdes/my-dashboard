/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
const { Warning } = require("postcss");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        // Define fallback colours (used when no theme is applied)
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        success: "var(--color-success)"
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"] // Add Sora font
      }
    }
  },
  plugins: [flowbite.plugin()]
};
