/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      background: "var(--color-background)",
    },
    borderWidth: {
      global: "var(--border-width)",
    },
    strokeWidth: { global: "var(--border-width)" },
    extend: {},
  },
  plugins: [],
};
