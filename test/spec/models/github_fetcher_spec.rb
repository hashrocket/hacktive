require "rails_helper"

RSpec.describe GithubFetcher do
  context "#fetch" do
    it "Fetches and stores Github organizations' members and their events" do
      fetcher = create(:github_fetcher)
      last_fetched_at = fetcher.last_fetched_at
      fetcher.fetch(team: "Employees")

      expect(last_fetched_at).to_not(
        eq fetcher.reload.last_fetched_at
      )
      expect(Developer.count).to_not eq 0
      expect(DeveloperActivity.count).to_not eq 0
    end
  end
end
