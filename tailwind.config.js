/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2d4f8f',
        secondary: '#2563eb',
        header : '#759bb9',
        danger: '#e3342f',
      },
    },
  },
  plugins: [],
}