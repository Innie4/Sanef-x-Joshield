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
        jossy: {
          black: "#08090c",
          dark: "#0f1218",
          card: "#161b24",
          border: "#252d3d",
          gray: "#333d52",
          muted: "#94a3b8",
          light: "#f1f5f9",
          blue: {
            DEFAULT: "#2563eb",
            hover: "#1d4ed8",
            light: "#3b82f6",
            glow: "#60a5fa",
            subtle: "#1e3a8a33"
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "monospace"],
      }
    },
  },
  plugins: [],
};