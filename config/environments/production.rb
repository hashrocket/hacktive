Rails.application.configure do
  config.action_controller.perform_caching = true
  config.active_record.dump_schema_after_migration = false
  config.active_support.deprecation = :notify
  config.cache_classes = true
  config.consider_all_requests_local       = false
  config.eager_load = true
  config.i18n.fallbacks = true
  config.log_formatter = ::Logger::Formatter.new
  config.log_level = :debug
  config.react.variant = :production
  config.serve_static_files = ENV['RAILS_SERVE_STATIC_FILES'].present?
end
