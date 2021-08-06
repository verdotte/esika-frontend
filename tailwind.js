module.exports = {
  mode: 'jit',
  purge: {
    preserveHtmlElements: false,
    content: [
      './public/*.html',
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js',
    ],
    options: {
      keyframes: false,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-thin': 'rgba(135, 206, 235, 0.2)',
        'brand-bold': 'rgba(135, 206, 235, 0.98)',
        'brand-semi-bold': 'rgba(135, 206, 235, 0.65)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
