var path = require("path");
var webpack = require("webpack");

var config = module.exports = {
	context: path.join(__dirname, "../", "../")
};

config.entry = {
	entry: "./app/frontend/javascripts/entry.jsx"
}

config.output = {
	devtoolFallbackModuleFilenameTemplate: "[resourcePath]?[hash]",
	devtoolModuleFilenameTemplate: "[resourcePath]",
	filename: "bundle.js",
	path: path.resolve("./app/assets/javascripts"),
	publicPath: "/assets"
};

config.plugins = [
	new webpack.ProvidePlugin({
		$: "jquery",
		jQuery: "jquery",
		moment: "moment"
	})
];

config.resolve = {
	alias: {
		flux_root: path.resolve("./app/frontend/javascripts/flux"),
		js_root: path.resolve("./app/frontend/javascripts")
	},
	extensions: ["", ".js", ".jsx"],
	modulesDirectories: [ "node_modules" ],
	root: path.resolve("./app/frontend/javascripts"),
};

config.module = {
	loaders: [
		{
			exclude: /(node_modules)/,
			loader: "babel",
			query: {
				presets: ["es2015", "react"]
			},
			test: /\.jsx?$/
		}
	]
};
