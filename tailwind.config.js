/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'IBM Plex Sans'", "sans-serif"], // Add IBM Plex Sans as the default sans font
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
