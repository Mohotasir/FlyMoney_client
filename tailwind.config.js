/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#313844",
        secondary: "#282e38",
        "header-bg": "#2c333e",
        "text-color": "#c4c7d1",
      },
    },
  },
  plugins: [],
}

