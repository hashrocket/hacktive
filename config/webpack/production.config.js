var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

var config = module.exports = require('./main.config.js');

config.output = _.merge(config.output, {
	chunkFilename: '[id]-bundle-[chunkhash].js',
	filename: '[name]-bundle-[chunkhash].js',
	path: path.join(config.context, 'public', 'assets')
});

config.plugins.push(
	new ChunkManifestPlugin({
		filename: 'webpack-common-manifest.json',
		manfiestVariable: 'webpackBundleManifest'
	}),
	new webpack.optimize.CommonsChunkPlugin('common', 'common-[chunkhash].js'),
	new webpack.DefinePlugin({
		"process.env": {
			NODE_ENV: JSON.stringify("production")
		}
	}),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin()
);
