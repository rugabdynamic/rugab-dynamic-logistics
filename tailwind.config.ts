import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logistics brand palette: deep navy primary, green/orange accents.
        navy: {
          50: "#eef2f7",
          100: "#d3deec",
          200: "#a7bdda",
          300: "#7b9cc7",
          400: "#4f7bb5",
          500: "#345f96",
          600: "#284a75",
          700: "#1d3658",
          800: "#13233b",
          900: "#0b1626",
        },
        accent: {
          DEFAULT: "#16a34a", // green CTA
          dark: "#15803d",
        },
        warn: {
          DEFAULT: "#ea580c", // orange status
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
