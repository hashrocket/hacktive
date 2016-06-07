Rails.application.configure do
  config.assets.compile = true
  config.assets.debug = true
  config.assets.digest = false
  config.assets.enabled = true
  config.assets.precompile += %w[
		entry
		*.css
		*.eot
		*.js
		*.sass
		*.scss
		*.svg
		*.ttf
		*.woff
		*.woff2
		index.js
	]
  config.assets.raise_runtime_errors = true
  config.assets.version = "2.0"
end
