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
      thickness: "var(--trnr-thickness)",
      1: "1rem",
    },
    borderRadius: {
      global: "var(--trnr-roundness)",
    },
    fontFamily: {
      sans: ["Jura"],
    },
    outlineWidth: {
      global: "var(--trnr-thickness)",
    },
    outlineOffset: {
      global: "var(--trnr-thickness)",
    },
    extend: {
      margin: {
        "thickness-1/2": "calc(var(--trnr-thickness) / 2)",
        "thickness-1": "var(--trnr-thickness)",
        "thickness-2": "calc(var(--trnr-thickness) * 2)",
      },
    },
  },
};
