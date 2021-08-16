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
        'brand-thin': 'rgba(60, 79, 224, 0.6)',
        'brand-bold': '#3c4fe0',
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
