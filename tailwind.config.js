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
      main: '0px 2px 2px rgba(125, 198, 252, 0.24), 0px -2px 2px rgba(125, 198, 252, 0.24)', // class="shadow-main"
    },
    // THEME
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
      }),
      // ALL COLORS
      colors: {
        body: {
          DEFAULT: '#FCFCFC', // class="bg-body"
          dark: '#1D1C4B', // class="bg-body-dark"
        },
        accent: {
          DEFAULT: '#3B82F6', // class="bg-accent text-accent border-accent"
          dark: '#0F0E39', // class="bg-accent-dark text-accent-dark border-accent-dark"
        },
        overlay: {
          DEFAULT: 'rgba(29, 28, 74, 0.7);', // class="bg-accent text-accent border-accent"
          dark: 'rgba(252, 252, 252, 0.7);', // class="bg-accent-dark text-accent-dark border-accent-dark"
        },
        menu: {
          DEFAULT: 'rgba(59, 130, 246, 0.9)', // class="bg-accent text-accent border-accent"
          dark: 'rgba(29, 28, 74, 0.9)', // class="bg-accent-dark text-accent-dark border-accent-dark"
        },
        font: {
          dark: '#1D1C4A', // class="bg-font-dark text-font-dark border-font-dark"
          light: '#FCFCFC', // class="bg-font-light text-font-light border-font-light"
          placeholder: '#9A9A9A', // class="bg-font-placeholder text-font-placeholder border-font-placeholder"
        },
        icon: {
          secondary: '#A6B3C9', // class="text-icon-secondary border-icon-secondary"
          light: '#FCFCFC', // class="bg-icon-light text-icon-light border-icon-light"
          accent: '#3B82F6', // class="bg-icon-accent text-icon-accent border-icon-accent"
        },
        hover: '#1D4ED8',
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
    },
  },
  plugins: [],
};
