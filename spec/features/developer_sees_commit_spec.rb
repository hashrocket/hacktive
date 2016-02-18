require 'rails_helper'

RSpec.feature "Hacker list" do
  scenario "Developer sees list of all co-workers", type: :request do
    # Given an organization exists on github
    # And that organization has members
    hashrocket_memebers = [
      {
        "login" => "adennis4",
        "id" => 785345,
        "avatar_url" => "https://avatars.githubusercontent.com/u/785345?v=3",
        "gravatar_id" => "",
        "url" => "https://api.github.com/users/adennis4",
        "html_url" => "https://github.com/adennis4",
        "followers_url" => "https://api.github.com/users/adennis4/followers",
        "following_url" => "https://api.github.com/users/adennis4/following{/other_user}",
        "gists_url" => "https://api.github.com/users/adennis4/gists{/gist_id}",
        "starred_url" => "https://api.github.com/users/adennis4/starred{/owner}{/repo}",
        "subscriptions_url" => "https://api.github.com/users/adennis4/subscriptions",
        "organizations_url" => "https://api.github.com/users/adennis4/orgs",
        "repos_url" => "https://api.github.com/users/adennis4/repos",
        "events_url" => "https://api.github.com/users/adennis4/events{/privacy}",
        "received_events_url" => "https://api.github.com/users/adennis4/received_events",
        "type" => "User",
        "site_admin" => false
      },
      {
        "login" => "briandunn",
        "id" => 93310,
        "avatar_url" => "https://avatars.githubusercontent.com/u/93310?v=3",
        "gravatar_id" => "",
        "url" => "https://api.github.com/users/briandunn",
        "html_url" => "https://github.com/briandunn",
        "followers_url" => "https://api.github.com/users/briandunn/followers",
        "following_url" => "https://api.github.com/users/briandunn/following{/other_user}",
        "gists_url" => "https://api.github.com/users/briandunn/gists{/gist_id}",
        "starred_url" => "https://api.github.com/users/briandunn/starred{/owner}{/repo}",
        "subscriptions_url" => "https://api.github.com/users/briandunn/subscriptions",
        "organizations_url" => "https://api.github.com/users/briandunn/orgs",
        "repos_url" => "https://api.github.com/users/briandunn/repos",
        "events_url" => "https://api.github.com/users/briandunn/events{/privacy}",
        "received_events_url" => "https://api.github.com/users/briandunn/received_events",
        "type" => "User",
        "site_admin" => false
      }
    ]

    # Then I see a card for each member of the organization
    Developer.create_with_json_array(hashrocket_memebers)

    expect(Developer.count).to eq hashrocket_memebers.length
  end

  scenario "Developer sees commit to project", type: :request do
    # https://api.github.com/users/vekh
    github_developer = {
      "login" => "VEkh",
      "id" => 735821,
      "avatar_url" => "https://avatars.githubusercontent.com/u/735821?v=3",
      "gravatar_id" => "",
      "url" => "https://api.github.com/users/VEkh",
      "html_url" => "https://github.com/VEkh",
      "followers_url" => "https://api.github.com/users/VEkh/followers",
      "following_url" => "https://api.github.com/users/VEkh/following{/other_user}",
      "gists_url" => "https://api.github.com/users/VEkh/gists{/gist_id}",
      "starred_url" => "https://api.github.com/users/VEkh/starred{/owner}{/repo}",
      "subscriptions_url" => "https://api.github.com/users/VEkh/subscriptions",
      "organizations_url" => "https://api.github.com/users/VEkh/orgs",
      "repos_url" => "https://api.github.com/users/VEkh/repos",
      "events_url" => "https://api.github.com/users/VEkh/events{/privacy}",
      "received_events_url" => "https://api.github.com/users/VEkh/received_events",
      "type" => "User",
      "site_admin" => false,
      "name" => "Vidal Ekechukwu",
      "company" => nil,
      "blog" => nil,
      "location" => nil,
      "email" => nil,
      "hireable" => nil,
      "bio" => nil,
      "public_repos" => 2,
      "public_gists" => 0,
      "followers" => 1,
      "following" => 2,
      "created_at" => "2011-04-18T04:48:52Z",
      "updated_at" => "2016-02-16T17:23:23Z"
    }

    # https://api.github.com/users/vekh/events
    github_developer_events = [
      {
        "id" => "3650080452",
        "type" => "PushEvent",
        "actor" => {
          "id" => 735821,
          "login" => "VEkh",
          "gravatar_id" => "",
          "url" => "https://api.github.com/users/VEkh",
          "avatar_url" => "https://avatars.githubusercontent.com/u/735821?"
        },
        "repo" => {
          "id" => 51382870,
          "name" => "VEkh/sideprojects",
          "url" => "https://api.github.com/repos/VEkh/sideprojects"
        },
        "payload" => {
          "push_id" => 979550639,
          "size" => 1,
          "distinct_size" => 1,
          "ref" => "refs/heads/master",
          "head" => "30cbf09da0778e4f1eb0bc94575d858d68ea95d6",
          "before" => "6ae4312e0b28cd32d3b49e11ecae68bbe9b58d62",
          "commits" => [
            {
              "sha" => "30cbf09da0778e4f1eb0bc94575d858d68ea95d6",
              "author" => {
                "email" => "vekechukwu@gmail.com",
                "name" => "Vidal Ekechukwu"
              },
              "message" => "Migrating to Hashrocket git",
              "distinct" => true,
              "url" => "https://api.github.com/repos/VEkh/sideprojects/commits/30cbf09da0778e4f1eb0bc94575d858d68ea95d6"
            }
          ]
        },
        "public" => true,
        "created_at" => "2016-02-16T15:33:52Z"
      }
    ]

    Developer.create_with_json(github_developer)
    DeveloperActivity.create_with_json(github_developer_events)

    get '/developers.json'
    developer = JSON.parse(response.body).first
    activity = developer['activities'].first

    expect(developer['name']).to eq 'VEkh'
    expect(activity['repo_name']).to eq 'VEkh/sideprojects'
    expect(activity['commits'].values).to include 'Migrating to Hashrocket git'
  end
end
