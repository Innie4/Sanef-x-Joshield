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
        sanef: {
          white: "#ffffff",
          offwhite: "#f8fafc",
          gray: {
            light: "#f1f5f9",
            border: "#e2e8f0",
            DEFAULT: "#64748b",
            dark: "#334155",
            charcoal: "#0f172a"
          },
          green: {
            light: "#ecfdf5",
            mint: "#a7f3d0",
            DEFAULT: "#059669",
            dark: "#047857",
            emerald: "#065f46",
            subtle: "#05966915"
          }
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
};