module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'Arial', 'sans-serif'],
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        appear: 'appear 500ms ease-in-out',
      },
      backgroundSize: {
        'size-400': '400% 400%',
      },
      backgroundPosition: {
        'pos-passive': '50% 0%',
        'pos-hover': '0% 20%',
      },
    },
  },
  plugins: [],
};
