require 'rails_helper'

RSpec.feature 'Github API polling' do
  context 'Github fetch is requested upon a Hacktive organization page visit', type: :request do
    scenario "Fetcher has slept long enough", type: :request do
      github_developers = [
        {
          "login" => "VEkh",
          "id" => 735821
        }
      ]

      Developer.create_with_json_array(github_developers)

      fetcher = GithubFetcher.fetcher
      sleep_duration = ENV['FETCH_SLEEP_DURATION'].to_i

      fetcher.update_attributes(
        last_fetched_at: Time.now - (2 * sleep_duration).seconds
      )

      expect(fetcher.should_fetch?).to be true
    end

    scenario "Fetcher has not slept long enough", type: :request do
      github_developers = [
        {
          "login" => "VEkh",
          "id" => 735821
        }
      ]

      Developer.create_with_json_array(github_developers)

      fetcher = GithubFetcher.fetcher
      sleep_duration = ENV['FETCH_SLEEP_DURATION'].to_i

      fetcher.update_attributes(
        last_fetched_at: Time.now
      )

      expect(fetcher.should_fetch?).to be false
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
