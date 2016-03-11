Rails.application.configure do
  config.assets.enabled = true
  config.assets.precompile += %w( entry *.js )
  config.assets.version = '2.0'
end
