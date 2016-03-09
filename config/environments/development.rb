Rails.application.configure do
  config.action_controller.perform_caching = false
  config.action_mailer.raise_delivery_errors = false
  config.active_record.migration_error = :page_load
  config.active_support.deprecation = :log
  config.assets.debug = true
  config.assets.digest = false
  config.cache_classes = false
  config.consider_all_requests_local = true
  config.eager_load = false
  config.react.variant = :development
end
