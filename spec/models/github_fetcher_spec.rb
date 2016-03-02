require 'rails_helper'

RSpec.describe GithubFetcher do
  context '::fetch' do
    it "Fetches and stores Github organizations' members and their events" do
      old_fetcher = GithubFetcher.fetcher
      GithubFetcher.fetch('hashrocket', 'Employees')

      expect(GithubFetcher.fetcher.last_fetched_at).to_not(
        eq old_fetcher.last_fetched_at
      )
      expect(Developer.count).to_not eq 0
      expect(DeveloperActivity.count).to_not eq 0
    end
  end

  context '#should_fetch?' do
    it 'Determines whether Github data should be fetched' do
      fetcher = GithubFetcher.fetcher
      expect(fetcher.should_fetch?).to be(true).or be(false)
    end
  end
end
