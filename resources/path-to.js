/* eslint-env node */

var path = require("path");

var projectDir = path.dirname(__dirname);
var backendDir = path.join(projectDir, "backend");
var frontendDir = path.join(projectDir, "frontend");
var dependenciesDir = path.join(projectDir, "node_modules");
var publicDir = path.join(frontendDir, "public");
var webpackBuildDir = path.join(publicDir, "build");

module.exports = {
  backendDir: backendDir,
  buildPath: "/build",
  dependenciesDir: dependenciesDir,
  developmentWebpackConfigFile: path.join(projectDir, "webpack.development.config.js"),
  frontendDir: frontendDir,
  frontendIndex: path.join(frontendDir, "index.js"),
  knexfile: path.join(projectDir, "knexfile.js"),
  productionWebpackConfigFile: path.join(projectDir, "webpack.production.config.js"),
  project: projectDir,
  publicDir: publicDir,
  webpackBuildDir: webpackBuildDir,
};
