/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#1e293b",
        accent: "#f59e0b",
        surface: "#f8fafc",
        background: "#ffffff",
        success: "#059669",
        warning: "#d97706",
        error: "#dc2626",
        info: "#2563eb",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}