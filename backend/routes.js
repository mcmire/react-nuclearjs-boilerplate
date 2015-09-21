var express = require("express");
var app = express();

app.get("/items", function (req, res) {
  var items = [
    { id: 1, value: "Walk the dog" },
    { id: 2, value: "Pick up Stacy from soccer" },
    { id: 3, value: "Fix the sink" }
  ];

  res.format({
    json: function () {
      res.json(items);
    },

    default: function () {
      res.sendStatus(406);
    }
  });
});

module.exports = app;
