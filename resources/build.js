#!/usr/bin/env node

var webpack = require("webpack");
var pathTo = require("./path-to");
var webpackConfig = require(pathTo.productionWebpackConfigFile);

var compiler = webpack(webpackConfig);
var bundleStart = Date.now();

console.log("Building project, please wait...");

compiler.run(function () {
  console.log("Built in " + (Date.now() - bundleStart) + "ms!");
});
