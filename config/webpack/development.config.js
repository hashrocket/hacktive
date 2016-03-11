var webpack = require('webpack');
var _ = require('lodash');
var config = module.exports = require('./main.config.js');

config = _.merge(config, {
	debug: true,
	devtool: 'eval-source-map',
	displayErrorDetails: true,
	outputPathinfo: true
});
