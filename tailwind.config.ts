import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linen: {
          DEFAULT: "#F4EFE4",
          50: "#FDFCFA",
          100: "#F4EFE4",
          200: "#EAE2CF",
          300: "#DDD1B4",
        },
        ink: {
          DEFAULT: "#181613",
          800: "#241F1A",
          700: "#332B23",
        },
        gold: {
          DEFAULT: "#B08B4F",
          light: "#D4B788",
          dark: "#8A6A38",
        },
        wine: "#4A211F",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) forwards",
        "fade-in": "fade-in 0.6s ease forwards",
        "scale-in": "scale-in 0.35s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
