/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#DB4444",
        "primary-dark": "#AF3636",
        "type-text": "#030406",
        "type-text-light": "#89868D",
        "type-text-disable": "#B4B2B7",
        "surface-neutral": "#FFFFFF",
        "surface-background": "#F4F5F9",
        "surface-background-2": "#E7E7F4",
        "surface-border": "#DBDCDE",
      },
      container: {
        center: true,
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1279px",
          xl: "1279px",
          "2xl": "1279px",
        },
      },
      margin: {},
      padding: {},
      borderRadius: {},
      fontSize: {},
      height: {},
      width: {},
    },
  },
  plugins: [],
};
