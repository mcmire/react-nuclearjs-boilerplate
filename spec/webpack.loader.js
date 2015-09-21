/* eslint-env commonjs */

// ES5 shims for Function.prototype.bind, Object.prototype.keys, etc.
require("core-js/es5");

var context = require.context(".", true, /_spec\.jsx?$/);
context.keys().forEach(context);

require("./support/to_match_element_matcher");
