var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
	context: path.join(__dirname, '../', '../')
};

config.entry = {
	entry: './app/frontend/javascripts/entry.js'
}

config.output = {
	devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
	devtoolModuleFilenameTemplate: '[resourcePath]',
	filename: 'bundle.js',
	path: path.join(config.context, 'app', 'assets', 'javascripts'),
	publicPath: '/assets'
};

config.plugins = [
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery'
	})
];

config.resolve = {
	extensions: ['', '.js', '.jsx'],
	modulesDirectories: [ 'node_modules' ],
};

config.module = {
	loaders: [
		{
			test: /\.jsx?$/,
			exclude: /(node_modules)/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react']
			}
		}
	]
};
