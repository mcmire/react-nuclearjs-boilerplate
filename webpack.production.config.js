/* eslint-env node */

var webpack = require("webpack");
var pathTo = require("./resources/path-to");

var config = {
  devtool: "source-map",
  entry: pathTo.frontendIndex,
  output: {
    path: pathTo.webpackBuildDir,
    filename: "index.js"
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: "babel",
      include: [pathTo.backendDir, pathTo.frontendDir]
    }, {
      test: /\.scss$/,
      loader: "style!css!sass",
      include: [pathTo.backendDir, pathTo.frontendDir]
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};

module.exports = config;
