/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ffffff",
        ink: "#0b132b",
        sand: { DEFAULT: "#f8fafc", deep: "#e2e8f0" },
        muted: "#64748b",
        accent: { DEFAULT: "#c59b27", dark: "#9a7818", soft: "#fdfbf2" },
        corporate: { navy: "#0f172a", blue: "#1d4ed8", gold: "#d4af37" },
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "Times New Roman", "serif"],
        sans: ['"Hanken Grotesk"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { page: "80rem" },
    },
  },
  plugins: [],
};
