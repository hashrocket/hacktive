# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Number of seconds that should have passed before fetching again
ENV['FETCH_SLEEP_DURATION'] = 10.minutes.to_s

# Initialize the Rails application.
Rails.application.initialize!
