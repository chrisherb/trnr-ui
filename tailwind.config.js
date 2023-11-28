/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--trnr-color-primary)",
      secondary: "var(--trnr-color-secondary)",
      background: "var(--trnr-color-background)",
      transparent: "rgba(0, 0, 0, 0)",
    },
    strokeWidth: { global: "var(--trnr-thickness)" },
    fontFamily: {
      sans: ["Jura"],
    },
    borderWidth: {
      1: "var(--trnr-thickness)",
    },
    borderColor: {
      primary: "var(--trnr-color-primary)",
      secondary: "var(--trnr-color-secondary)",
    },
    borderRadius: {
      1: "var(--trnr-roundness)",
    },
    ringOffsetWidth: {
      1: "var(--trnr-thickness)",
      4: "calc(var(--trnr-thickness) * 4)",
    },
    ringOffsetColor: {
      primary: "var(--trnr-color-primary)",
      secondary: "var(--trnr-color-secondary)",
      background: "var(--trnr-color-background)",
    },
    gap: {
      "1/2": "calc(var(--trnr-thickness) / 2)",
      1: "var(--trnr-thickness)",
      2: "calc(var(--trnr-thickness) * 2)",
      9: "calc(var(--trnr-thickness) * 9)",
    },
    extend: {
      padding: {
        roundness: "var(--trnr-roundness)",
      },
      height: {
        9: "calc(var(--trnr-thickness) * 9)",
      },
      dropShadow: {
        glow: "35px 35px 35px rgba(--trnr-color-primary)",
      },
    },
  },
};
