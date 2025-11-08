/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./resume.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#F9FAFB",
        dark: "#111827",
        300: "#D1D5DB",
        primary: "#9C83FF",
        secondary: "#FF9051",
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
