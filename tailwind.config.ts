import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette (single source of truth) ──────────────────────────
        // Navy = dominant (nav, headings, dark sections).
        navy: {
          DEFAULT: "#1B3A6B",
          deep: "#102A52",
          // Tonal scale kept for existing surfaces/borders mid-migration.
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
        // Red + orange = rare CTA accents. Teal = "air/movement" accent.
        brand: {
          red: "#DA3B2B",
          orange: "#E2632E",
          teal: "#1C9BD8",
        },
        ink: "#0F1B2D",
        muted: "#64748B",
        surface: "#FFFFFF",
        canvas: "#F5F7FA",

        // Legacy aliases → remapped onto brand so un-migrated pages adopt the
        // new identity automatically. Remove once every page uses brand-*.
        accent: {
          DEFAULT: "#DA3B2B",
          dark: "#C32A1B",
        },
        warn: {
          DEFAULT: "#E2632E",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Soft, navy-tinted elevation instead of harsh black.
        brand: "0 10px 30px -10px rgba(27,58,107,0.35)",
        "brand-lg": "0 24px 50px -12px rgba(27,58,107,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "route-dash": {
          to: { strokeDashoffset: "-1000" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "route-dash": "route-dash 20s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
