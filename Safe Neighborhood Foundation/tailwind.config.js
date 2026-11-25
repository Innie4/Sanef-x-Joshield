/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: "#FAF8F5",
        surface: "#FFFFFF",
        border: "#E7E5E4",
        forest: "#1B4332",
        terracotta: "#C85A32",
        stone900: "#1C1917",
        stone600: "#57534E",
      },
      fontFamily: {
        serif: ["'Newsreader Variable'", "Newsreader", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans Variable'", "'Plus Jakarta Sans'", "-apple-system", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      borderRadius: {
        card: "10px",
      },
    },
  },
  plugins: [],
};
