import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EAF6FC",
          100: "#D6ECF8",
          200: "#A9D7F0",
          300: "#6CBCE4",
          400: "#329CD1",
          500: "#167CB5",
          600: "#0E5A8A",
          700: "#0E3568",
          800: "#0B2F5B",
          900: "#071F3D",
        },
        sky: {
          50: "#EAF6FC",
          100: "#CFF0FB",
          200: "#93DCF7",
          300: "#4EC5F3",
          400: "#00AEEF",
          500: "#009FE3",
          600: "#087EB2",
          700: "#0A638C",
          800: "#0C4968",
          900: "#0A334A",
          DEFAULT: "#00AEEF",
          dark: "#009FE3",
        },
        accent: {
          50: "#FFF1EC",
          100: "#FFE0D3",
          200: "#FFC1A7",
          300: "#FF9770",
          400: "#F77542",
          500: "#F05A28",
          600: "#E94B2E",
          700: "#BF321D",
          800: "#982A1C",
          900: "#7A281D",
          DEFAULT: "#F05A28",
          dark: "#E94B2E",
        },
        warn: {
          DEFAULT: "#F59E0B",
        },
        surface: "#F4F7FA",
        ink: "#102A43",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 45px -28px rgba(11, 47, 91, 0.35)",
        lift: "0 24px 60px -30px rgba(11, 47, 91, 0.45)",
        glow: "0 12px 30px -18px rgba(240, 90, 40, 0.85)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "route-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        "slide-in": "slide-in 600ms ease-out both",
        "route-pulse": "route-pulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
