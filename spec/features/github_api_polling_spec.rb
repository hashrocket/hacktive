require 'rails_helper'

RSpec.feature "Github API polling" do
  scenario "Github public organization's developers are imported from API" do
    client = Octokit::Client.new
    github_developers = client.get("/orgs/hashrocket/members")
    Developer.create_with_json_array(github_developers.as_json)

    expect(Developer.count).to eq github_developers.count
  end

  scenario "Github developer's public events are imported from API" do
    client = Octokit::Client.new
    developer_events = client.get("/users/vekh/events")
    developer = developer_events.first.attrs[:actor]

    acceptable_developer_events = developer_events.select do |event|
      EventType::TYPE_WHITELIST.include?(event.attrs[:type])
    end

    Developer.create_with_json(developer.as_json)
    DeveloperActivity.create_with_json(developer_events.as_json)

    expect(DeveloperActivity.count).to eq acceptable_developer_events.count
  end
end
