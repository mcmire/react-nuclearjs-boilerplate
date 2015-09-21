#!/usr/bin/env node

/* eslint-env node */

var pg = require("pg");
var connectionStringParser = require("pg-connection-string");
var knexConfig = require("./knex-config");

var connectionOptions = connectionStringParser.parse(knexConfig.connection);
var databaseName = connectionOptions.database;
connectionOptions.database = "postgres";

var client = new pg.Client(connectionOptions);
client.on("drain", client.end.bind(client));
client.connect(function (error) {
  if (error) {
    console.error(error.message);
    process.exit(1);
  } else {
    client.query("CREATE DATABASE " + databaseName, function (error) {
      if (error) {
        if (error.message.match(/already exists/)) {
          console.log(error.message);
        } else {
          console.error(error.message);
          process.exit(1);
        }
      } else {
        console.log(databaseName + " successfully created");
      }
    });
  }
});
