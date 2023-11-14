/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#605F60",
          200: "#2E2D2E",
          400: "#191819",
          600: "#0D0B0D",
        },
        grey: {
          0: "#FFFFFF",
          10: "#F6F6F6",
          50: "#F0F0F0",
          100: "#E0E0E0",
          200: "#C2C2C2",
          300: "#A3A3A3",
          400: "#858585",
          500: "#666666",
          600: "#4D4D4D",
          700: "#333333",
          800: "#1A1A1A",
          900: "#0A0A0A",
          1000: "#000000",
        },
        primary: {
          50: "#E6FBFF",
          100: "#CCF7FE",
          200: "#99EEFD",
          300: "#66E6FC",
          400: "#33DDFB",
          500: "#00D5FA",
          600: "#00A0BC",
          700: "#006B7D",
          800: "#00353F",
          900: "#001519",
        },
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      fontSize: {
        // Font size tokens
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
        32: "32px",
        40: "40px",
      },
    },
  },
  plugins: [],
};
