var _ = require("lodash");
var webpack = require("webpack");
var config = require("./main.config.js");

config.devtool = "inline-source-map";

config.externals = {
	"cheerio": "window",
  "react/addons": true,
  "react/lib/ExecutionEnvironment": true,
  "react/lib/ReactContext": true
};


module.exports = config;
