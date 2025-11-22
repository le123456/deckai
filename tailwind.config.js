/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#050816',
        backgroundSoft: '#0B1020',
        primary: '#7C3AED',
        primarySoft: '#A855F7',
        accent: '#22D3EE',
      },
    },
  },
  plugins: [],
};
