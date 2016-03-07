require 'rails_helper'

RSpec.feature 'Github API polling' do
  context 'I arrive at developers page' do
    scenario 'Polling has not started', type: :request do
      fetcher = GithubFetcher.fetcher
      fetcher.update_attributes(last_fetched_at: nil)

      expect(GithubFetchJob).to receive(:perform_later).once
      get '/developers'
    end

    scenario 'Fetcher has slept long enough', type: :request do
      fetcher = GithubFetcher.fetcher
      fetcher.update_attributes(requests: 10)

      sleep_duration = fetcher.sleep_duration
      fetcher.update_attributes(
        last_fetched_at: (sleep_duration * 2).seconds.ago
      )

      expect(GithubFetchJob).to receive(:perform_later).once
      get '/developers'
    end

    scenario 'Fetcher not slept long enough', type: :request do
      fetcher = GithubFetcher.fetcher
      fetcher.update_attributes(requests: 10)

      sleep_duration = fetcher.sleep_duration
      fetcher.update_attributes(
        last_fetched_at: Time.now
      )

      expect(GithubFetchJob).to_not receive(:perform_later)
      get '/developers'
    end
  end

  scenario "Github public organization's developers are imported from API" do
    client = Octokit::Client.new
    github_developers = client.get('/orgs/hashrocket/members')
    Developer.create_with_json_array(github_developers.as_json)

    expect(Developer.count).to eq github_developers.count
  end

  scenario "Github developer's public events are imported from API" do
    client = Octokit::Client.new
    developer_events = client.get('/users/vekh/events')

    developer = developer_events.first.attrs[:actor]
    Developer.create_with_json(developer.as_json)

    acceptable_developer_events = developer_events.select do |event|
      EventType::TYPE_WHITELIST.include?(event.attrs[:type])
    end

    DeveloperActivity.create_with_json(developer_events.as_json)

    expect(DeveloperActivity.count).to eq acceptable_developer_events.count
  end
end
