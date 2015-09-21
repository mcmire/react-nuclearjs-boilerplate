var buildWebpackDevMiddleware = require("webpack-dev-middleware");
var buildWebpackHotMiddleware = require("webpack-hot-middleware");
var AppServer = require("./app-server");

function DevelopmentAppServer(webpackCompiler) {
  this.webpackCompiler = webpackCompiler;
  var webpackDevMiddleware = buildWebpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackCompiler.options.output.publicPath
  });
  var webpackHotMiddleware = buildWebpackHotMiddleware(webpackCompiler);

  this.appServer = new AppServer;
  this.appServer.extend(function (app) {
    app.use(webpackDevMiddleware);
    app.use(webpackHotMiddleware);
  });
}

DevelopmentAppServer.prototype.start = function () {
  this.appServer.start();
};

module.exports = DevelopmentAppServer;
