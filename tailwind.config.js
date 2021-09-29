module.exports = {
  mode: 'jit',
  purge: ['./pages/**/**/*.{js,ts,jsx,tsx}', './components/**/**/*.{js,ts,jsx,tsx}', './layouts/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      
        transitionDuration: {
         '2000': '2000ms',
        },
     transitionTimingFunction: ['hover', 'focus'],
    }
  },
  plugins: [],
}
