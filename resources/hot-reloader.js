var chokidar = require("chokidar");
var path = require("path");
var pathTo = require("./path-to");

function HotReloader(webpackCompiler) {
  this.webpackCompiler = webpackCompiler;
}

HotReloader.prototype.activate = function () {
  this._hotReloadFrontendFiles();
  this._hotReloadBackendFiles();
};

HotReloader.prototype._hotReloadFrontendFiles = function () {
  this.webpackCompiler.plugin("done", function () {
    for (var id in require.cache) {
      if (/\/frontend\//.test(id)) {
        console.log("Removing from require.cache: " + id);
        delete require.cache[id];
      }
    }
  });
};

HotReloader.prototype._hotReloadBackendFiles = function () {
  var watcher = chokidar.watch(path.join(pathTo.backendDir, "routes.js"));
  watcher.on("ready", function () {
    watcher.on("all", function () {
      for (var id in require.cache) {
        if (/\/backend\//.test(id)) {
          console.log("Removing from require.cache: " + id);
          delete require.cache[id];
        }
      }
    });
  });
};

module.exports = HotReloader;
