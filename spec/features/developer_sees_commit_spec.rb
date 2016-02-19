require 'rails_helper'

RSpec.feature "Hacker list" do
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

  scenario "Developer commits and sees self at the top of the list", type: :request do
    # https://api.github.com/users/vekh/events
    vekh_events = [
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

    vekh = vekh_events.first['actor']

    Developer.create_with_json(vekh)
    DeveloperActivity.create_with_json(vekh_events)

    # https://api.github.com/users/chriserin/events
    chriserin_events = [
      {
        "id" => "3613641536",
        "type" => "PushEvent",
        "actor" => {
          "id" => 597909,
          "login" => "chriserin",
          "gravatar_id" => "",
          "url" => "https://api.github.com/users/chriserin",
          "avatar_url" => "https://avatars.githubusercontent.com/u/597909?"
        },
        "repo" => {
          "id" => 31873570,
          "name" => "chriserin/seq27",
          "url" => "https://api.github.com/repos/chriserin/seq27"
        },
        "payload" => {
          "push_id" => 966181213,
          "size" => 1,
          "distinct_size" => 1,
          "ref" => "refs/heads/master",
          "head" => "1007f813c367db8a610ea7a515ee25fb90bc498f",
          "before" => "57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1",
          "commits" => [
            {
              "sha" => "1007f813c367db8a610ea7a515ee25fb90bc498f",
              "author" => {
                "email" => "dev@hashrocket.com",
                "name" => "Hashrocket Workstation"
              },
              "message" => "Upgrade rails -> 4.2.5:W",
              "distinct" => true,
              "url" => "https://api.github.com/repos/chriserin/seq27/commits/1007f813c367db8a610ea7a515ee25fb90bc498f"
            }
          ]
        },
        "public" => true,
        "created_at" => "2016-02-05T21:18:31Z"
      }
    ]

    chriserin = chriserin_events.first['actor']

    Developer.create_with_json(chriserin)
    DeveloperActivity.create_with_json(chriserin_events)

    get '/developers.json'
    developers = JSON.parse(response.body)

    # Then the developer sees their card at the top of the list
    expect(developers.first['name']).to eq 'VEkh'
  end
end
