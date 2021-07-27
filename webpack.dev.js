const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const webpackCommon = require("./webpack.common");

module.exports = merge(webpackCommon, {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  devServer: {
    port: 3000,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, "build"),
    publicPath: "/",
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: /stylesheets|node_modules|src/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
