require 'rails_helper'

RSpec.describe GithubFetcher do
  before do
    event_types = [
      'IssuesEvent',
      'PullRequestEvent',
      'PushEvent',
      'WatchEvent'
    ]

    event_types.each do |event_type|
      EventType.find_or_create_by(name: event_type)
    end

    @fetcher = GithubFetcher.create!(
      id: 1,
      last_fetched_at: Time.now
    )
  end

  context '::fetch' do
    it "Fetches and stores Github organizations' members and their events" do
      GithubFetcher.fetch(
        organization: 'hashrocket',
        team: 'Employees'
      )

      expect(GithubFetcher.fetcher.last_fetched_at).to_not(
        eq @fetcher.last_fetched_at
      )
      expect(Developer.count).to_not eq 0
      expect(DeveloperActivity.count).to_not eq 0
    end
  end
end
