/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      background: "var(--color-background)",
      transparent: "rgba(0, 0, 0, 0)",
    },
    borderWidth: {
      global: "var(--border-width)",
    },
    strokeWidth: { global: "var(--border-width)" },
    outlineWidth: {
      global: "var(--border-width)",
    },
    padding: {
      global: "calc(var(--border-width))",
    },
    fontFamily: {
      sans: ["Jura"],
    },
    extend: {},
  },
};
