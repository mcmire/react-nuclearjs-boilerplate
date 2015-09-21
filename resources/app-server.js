var express = require("express");
var env = require("./env");
var pathTo = require("./path-to");

var port = env.require("APP_SERVER_PORT");

function AppServer() {
  this.app = express();
  this.app.use(function (req, res, next) {
    // require routes at runtime so that if they're modified they get reloaded
    require("../backend/routes")(req, res, next);
  });
  this.app.use(express.static(pathTo.publicDir));
}

AppServer.prototype.extend = function (fn) {
  fn(this.app);
};

AppServer.prototype.start = function () {
  this.app.listen(port, "localhost", function () {
    console.log("App server started on port " + port);
  });
};

module.exports = AppServer;
