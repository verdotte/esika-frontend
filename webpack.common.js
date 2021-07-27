const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
    chunkFilename: "[id].js",
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],
    alias: {
      root: path.resolve(__dirname, "./src"),
    },
    // fallback: {
    //   stream: require.resolve('stream-browserify'),
    //   crypto: require.resolve('crypto-browserify'),
    //   path: require.resolve('path-browserify'),
    //   fs: false,
    // },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: "/node_modules/",
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
        // options: {
        //   presets: ['@babel/preset-env', '@babel/preset-react'],
        //   plugins: ['@babel/transform-runtime'],
        // },
      },

      {
        test: /\.(?:ico|gif|jpg|png|svg)$/i,
        type: "asset/resource",
      },

      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inlineSource: ".(ts|tsx|js|jsx|css)$",
    }),
  ],
};
