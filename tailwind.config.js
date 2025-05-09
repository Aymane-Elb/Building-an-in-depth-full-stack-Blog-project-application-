export default {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        mulish: ['Mulish', 'sans-serif'],
      },
      transitionProperty: {
        all: 'all',
      },
      transitionDuration: {
        200: '0.2s',
      },
      transitionTimingFunction: {
        'ease-in-out': 'ease-in-out',
      },
      colors: {
        'nav-bar': '#FDB441',
        'nav-tex-color': '#002742',
        'btn-color': '#000000',
        'mid-light': '#949993',
        'light-color': '#ece0c8',
        'yel-tex': '#FDAC2E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.hover-white-uderline': {
          '&:hover::after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '-3px',
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
          },
        },
      });
    },
  ],
};
