/* eslint-env node */

module.exports = function(config) {
  config.set({
    browsers: ["PhantomJS"],
    files: [
      { pattern: "spec/webpack.loader.js", watched: false }
    ],
    frameworks: ["jasmine"],
    preprocessors: {
      "spec/webpack.loader.js": ["webpack", "sourcemap"],
    },
    reporters: ["dots", "html"],
    //singleRun: true,
    webpack: {
      devtool: "inline-source-map",
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: "babel",
            exclude: /node_modules/
          }
        ]
      },
      watch: true,
    }
  });
};

