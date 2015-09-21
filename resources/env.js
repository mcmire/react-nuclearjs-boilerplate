require("dotenv").load();

module.exports = {
  get: function (key, defaultValue) {
    if (key in process.env) {
      return process.env[key];
    } else {
      return defaultValue;
    }
  },

  require: function (key) {
    if (key in process.env) {
      return process.env[key];
    } else {
      throw new Error(key + " needs to be set");
    }
  }
};
