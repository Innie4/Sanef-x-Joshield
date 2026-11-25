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
        ice: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E2E8F0",
        navy: "#0F172A",
        amber: "#B45309",
        slate900: "#0F172A",
        slate600: "#475569",
      },
      fontFamily: {
        heading: ["'Archivo Variable'", "Archivo", "sans-serif"],
        sans: ["'Archivo Variable'", "Archivo", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sharp: "4px",
      },
    },
  },
  plugins: [],
};
