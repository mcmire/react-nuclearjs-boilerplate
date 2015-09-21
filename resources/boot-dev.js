#!/usr/bin/env node

var webpack = require("webpack");
var appEnvironment = require("./app-environment");
var HotReloader = require("./hot-reloader");
var DevelopmentAppServer = require("./development-app-server");
var AppServer = require("./app-server");
var pathTo = require("./path-to");

var webpackConfig = require(pathTo.developmentWebpackConfigFile);
var appServer;

if (appEnvironment === "development") {
  var compiler = webpack(webpackConfig);

  appServer = new DevelopmentAppServer(compiler);
  var hotReloader = new HotReloader(compiler);

  hotReloader.activate();
  appServer.start();
} else {
  appServer = new AppServer();
  appServer.start();
}
