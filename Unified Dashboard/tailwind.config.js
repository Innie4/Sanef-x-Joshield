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
        brand: {
          dark: "#0b0f17",
          card: "#121824",
          border: "#1f293d",
          muted: "#94a3b8",
          jossy: {
            blue: "#2563eb",
            blueGlow: "#3b82f6",
            dark: "#0a0c10"
          },
          sanef: {
            green: "#059669",
            emerald: "#047857",
            light: "#ecfdf5"
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