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
        canvas: "#FAFAFA",
        surface: "#FFFFFF",
        border: "#E4E4E7",
        brand: "#18181B",
        focus: "#2563EB",
        ink: "#09090B",
        muted: "#71717A",
        sanef: "#1B4332",
        josie: "#0F172A",
      },
      fontFamily: {
        sans: ["'Inter Variable'", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono Variable'", "'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        control: "6px",
      },
    },
  },
  plugins: [],
};
