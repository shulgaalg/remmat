/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', 'index2.php','./node_modules/tw-elements/dist/js/**/*.js'],
  theme: {

    fontFamily: {
      cgotic: ['CGOTIC', 'cursive'],
    },
    extend: {
      screens: {
        'mic': '320px',
        'mic2': '400px',
        // => @media (min-width: 640px) { ... }

        //'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }

        //'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
    }
  },
  varaints: {
    extend: {
      display: ['group-focus']
    }
  },
  plugins: [
    require("tw-elements/dist/plugin") 
  ],
}
