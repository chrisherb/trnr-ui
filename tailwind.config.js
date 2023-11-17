/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // "primary": "#87DEAA",
      // "secondary": "#F55A50",
      // "background": "black",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      background: "var(--color-background)",
    },
    extend: {},
  },
  plugins: [],
};
