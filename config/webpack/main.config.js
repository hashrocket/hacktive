var path = require("path");
var webpack = require("webpack");
var javascripts_root = "./app/frontend/javascripts";

var config = module.exports = {
  context: path.join(__dirname, "../", "../")
};

config.entry = {
  bundle: `${javascripts_root}/entry.jsx`
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

config.output = {
  devtoolFallbackModuleFilenameTemplate: "[resourcePath]?[hash]",
  devtoolModuleFilenameTemplate: "[resourcePath]",
  filename: "[name].js",
  path: path.resolve("./app/assets/javascripts"),
  publicPath: "/assets"
};

config.plugins = [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    React: "react",
    ReactDOM: "react-dom"
  })
];

config.resolve = {
  alias: {
    components: path.resolve(`${javascripts_root}/components`),
    flux: path.resolve(`${javascripts_root}/flux`),
    javascripts: path.resolve(javascripts_root)
  },
  extensions: ["", ".js", ".jsx"],
  modulesDirectories: [ "node_modules" ]
};
