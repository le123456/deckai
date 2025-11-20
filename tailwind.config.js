/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
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
