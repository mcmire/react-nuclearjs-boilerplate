/* eslint-env node */

var webpack = require("webpack");
var pathTo = require("./resources/path-to");

var config = {
  devtool: "#cheap-module-eval-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    pathTo.frontendIndex
  ],
  output: {
    path: pathTo.webpackBuildDir,
    filename: "index.js",
    publicPath: pathTo.buildPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        include: [pathTo.backendDir, pathTo.frontendDir],
        query: {
          optional: ["runtime"],
          plugins: [
            "react-display-name",
            "react-transform"
          ],
          extra: {
            "react-transform": [
              {
                target: "react-transform-hmr",
                imports: ["react"],
                locals: ["module"]
              },
              {
                target: "react-transform-catch-errors",
                imports: ["react", "redbox-react"]
              }
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass",
        include: [pathTo.backendDir, pathTo.frontendDir]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
