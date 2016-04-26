var path = require("path");
var webpack = require(path.resolve("./config/webpack/test.config.js"));

module.exports = function (config) {
  config.set({
    browsers: [ "Chrome" ],
    files: [
      "tests.webpack.js"
    ],
    frameworks: [ "mocha", "sinon-chai"],
    preprocessors: {
      "tests.webpack.js": [ "webpack", "sourcemap" ]
    },
    reporters: [ "dots" ],
    singleRun: true,
    webpack: webpack,
    webpackServer: {
      noInfo: true
    }
  });
};
