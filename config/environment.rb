# Load the Rails application.
require File.expand_path('../application', __FILE__)

ENV['ACTIVITY_CUTOFF_DURATION'] = 1.month.to_s
ENV['FETCH_SLEEP_DURATION'] = 1.minutes.to_s

# Initialize the Rails application.
Rails.application.initialize!
