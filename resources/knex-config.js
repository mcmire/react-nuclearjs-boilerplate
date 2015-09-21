var pathTo = require("./path-to");
var knexConfig = require(pathTo.knexfile);
var appEnvironment = require("./app-environment");

module.exports = knexConfig[appEnvironment];
