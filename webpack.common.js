const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
    chunkFilename: '[id].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    alias: {
      root: path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: '/node_modules/',
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },

      {
        test: /\.(?:ico|gif|jpg|png|svg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inlineSource: '.(ts|tsx|js|jsx|css)$',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: path.resolve(__dirname, 'build'),
        },
        {
          from: 'public/favicon.ico',
          to: path.resolve(__dirname, 'build'),
        },
        {
          from: 'public/*.png',
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
    new Dotenv({
      safe: true,
      allowEmptyValues: true,
      systemvars: true,
      silent: true,
      defaults: false,
    }),
  ],
};
