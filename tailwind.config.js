/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    // MEDIA QUERIES
    screens: {
      sm: '480px',
      md: '768px',
      xl: '1280px',
    },
    // BASE FONT
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'], // class="font-montserrat"
      // exo: ['"Exo 2"', 'sans-serif'],
    },
    // SHADOW
    boxShadow: {
      orange: '2px 8px 29px rgba(240, 127, 46, 0.2)', // class="shadow-orange"
    },
    // THEME
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      backgroundImage: {
        check: "url('../images/check.svg')",
      },
      // ALL COLORS
      colors: {
        body: {
          DEFAULT: '#FCFCFC',
          dark: '#1D1C4B',
        }, // class="bg-body"
        black: {
          DEFAULT: '#000000', // class="bg-black text-black border-black"
          light: '#202020', // class="bg-black-light text-black-light border-black-light"
          dark: '#010101',
        },
        white: {
          DEFAULT: '#ffffff', // class="bg-white text-white border-white"
          primary: '#FCFCFC', // class="bg-white-dark text-white-dark border-white-dark"
        },
        accent: {
          DEFAULT: '#3B82F6',
          dark: '#0F0E39',
        }, // class="bg-accent text-accent border-accent"
        primary: '#f1f1f1',
        second: '#f2f2f2',
      },
      // CONTAINER
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.25rem',
          md: '2rem',
          xl: '2.5rem',
        },
      },
      // KEYFRAMES
      keyframes: {
        side: {
          '0%, 100%': { transform: 'translateX(25%)' },
          '50%': { transform: ' translateY(0)' },
        },
      },
      // ANIMATION
      animation: {
        side: 'side 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
