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
    padding: {
      1: "var(--trnr-thickness)",
      2: "calc(var(--trnr-thickness) * 2)",
      3: "calc(var(--trnr-thickness) * 3)",
      4: "calc(var(--trnr-thickness) * 4)",
      5: "calc(var(--trnr-thickness) * 5)",
      6: "calc(var(--trnr-thickness) * 6)",
      7: "calc(var(--trnr-thickness) * 7)",
      8: "calc(var(--trnr-thickness) * 8)",
      9: "calc(var(--trnr-thickness) * 9)",
    },
    margin: {
      1: "var(--trnr-thickness)",
      2: "calc(var(--trnr-thickness) * 2)",
      3: "calc(var(--trnr-thickness) * 3)",
      4: "calc(var(--trnr-thickness) * 4)",
      5: "calc(var(--trnr-thickness) * 5)",
      6: "calc(var(--trnr-thickness) * 6)",
      7: "calc(var(--trnr-thickness) * 7)",
      8: "calc(var(--trnr-thickness) * 8)",
      9: "calc(var(--trnr-thickness) * 9)",
    },
    borderRadius: {
      1: "var(--trnr-roundness)",
    },
    fontFamily: {
      sans: ["Jura"],
    },
    ringWidth: {
      1: "var(--trnr-thickness)",
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
      1: "var(--trnr-thickness)",
      2: "calc(var(--trnr-thickness) * 2)",
      9: "calc(var(--trnr-thickness) * 9)",
    },
    height: {
      9: "calc(var(--trnr-thickness) * 9)",
      full: "100%",
      screen: "100vh",
    },
  },
};
