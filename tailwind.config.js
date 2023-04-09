/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      kaushan: ['Kaushan Script'],
    },
    boxShadow: {
      'custom-light': '8px 8px 8px -3px black',
      'custom-dark': '2px 5px 5px -2px black',
      'custom-gray': '0px 2px 8px 2px black',
    },
    extend: {},
  },
  plugins: [],
};
