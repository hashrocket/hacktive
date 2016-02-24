require 'rails_helper'

RSpec.feature 'Github API polling' do
  scenario 'Github is polled upon a Hactive organization page visit', type: :request do
    post(
      '/developers/fetch.json',
      {organization: 'hashrocket'}
    )

    developers = JSON.parse(response.body)

    first_developer = developers.first.as_json
    second_developer = developers.second.as_json

    expect(first_developer['first_activity_timestamp']).to(
      be > second_developer['first_activity_timestamp']
    )
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
