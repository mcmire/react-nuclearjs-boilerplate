/* eslint-env node */

var _ = require("lodash");
var env = require("./resources/env");

var commonOptions = {
  client: "postgresql",
  connection: env.require("DATABASE_URL"),
  migrations: {
    directory: "./db/migrations"
  }
};

module.exports = {
  development: _.merge({}, commonOptions, {
    seeds: {
      directory: "./db/seeds/development"
    }
  }),
  production: _.merge({}, commonOptions, {
    seeds: {
      directory: "./db/seeds/production"
    },
    pool: { min: 2, max: 10 }
  })
};
