Dir[
  File.expand_path("../support/**/*.rb", __FILE__)
].each {|f| require f}

RSpec.configure do |config|
  config.before(:suite) do
    begin
      DatabaseCleaner.start
    ensure
      DatabaseCleaner.clean
    end

    event_types = [
      "IssuesEvent",
      "PullRequestEvent",
      "PushEvent"
    ]

    event_types.each do |event_type|
      EventType.find_or_create_by(:name=>event_type)
    end
  end

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end
end
