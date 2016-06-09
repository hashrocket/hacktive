var path = require("path");
var webpack = require(path.resolve("./config/webpack/test.config.js"));

module.exports = function (config) {
  config.set({
    browsers: [ "Chrome" ],
    files: [
      "factories.webpack.js",
      "tests.webpack.js"
    ],
    frameworks: [
      "mocha",
      "sinon-chai",
      "chai-factories",
      "chai"
    ],
    preprocessors: {
      "factories.webpack.js": [ "webpack", "sourcemap" ],
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
