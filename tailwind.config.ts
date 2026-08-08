/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },

        ink: {
          950: "#071512",
          900: "#0b211c",
          800: "#12332a",
          700: "#23483d",
        },

        surface: {
          DEFAULT: "#f7faf9",
          muted: "#f1f5f3",
          card: "#ffffff",
        },
      },

      boxShadow: {
        soft: "0 4px 24px rgba(15, 23, 42, 0.06)",
        card: "0 2px 12px rgba(15, 23, 42, 0.05)",
        green: "0 10px 30px rgba(16, 185, 129, 0.18)",
      },

      borderRadius: {
        xl2: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};