/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.{html,js}'],
  theme: {
    extend: {},
    screens: {
      'mobile-s': '320px',
      'mobile-m': '375px',
      'mobile-l': '425px',
      tablet: '768px',
      laptop: '1024px',
      'laptop-l': '1440px',
      'four-k': '2560px',
    },
  },
  plugins: [],
};
