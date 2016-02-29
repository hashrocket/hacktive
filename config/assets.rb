Rails.application.configure do
  config.assets.version = '1.0'
  config.assets.precompile += %w( index.js )
end
