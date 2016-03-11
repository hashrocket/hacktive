web: rails server
webpack: webpack --config config/webpack/development.config.js --watch --colors
resque: env TERM_CHILD=1 QUEUE=github_fetch bundle exec rake resque:work
scheduler: env TERM_CHILD=1 bundle exec rake resque:scheduler
