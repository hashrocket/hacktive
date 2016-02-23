require 'rails_helper'

RSpec.feature "Github API polling" do
  scenario "Github public organization's developers are imported from API" do
    client = Octokit::Client.new
    github_developers = client.get("/orgs/hashrocket/members")
    Developer.create_with_json_array(github_developers.as_json)

    expect(Developer.count).to eq github_developers.count
  end
end
