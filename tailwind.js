module.exports = {
  purge: {
    preserveHtmlElements: false,
    content: [
      "./public/*.html",
      "./src/**/*.tsx",
      "./src/**/*.ts",
      "./src/**/*.jsx",
      "./src/**/*.js",
    ],
    options: {
      keyframes: false,
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
