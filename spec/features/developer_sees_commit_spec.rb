require 'rails_helper'

RSpec.feature "Hacker list" do
  xscenario "Developer sees list of all co-workers", type: :request do
    # Given an organization exists on github
    # And that organization has members
    # When I go to the hot hackers page
    # Then I see a card for each member of the organization

    # GET DEVS from members.json endpoint
    # chriserin
    # vekh

    #DEVELOPER ACTIVITY chriserin
    chriserin_events = [
      {
        "id" => "3605320086",
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
          "push_id" => 963193467,
          "size" => 1,
          "distinct_size" => 1,
          "ref" => "refs/heads/master",
          "head" => "57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1",
          "before" => "ea4dc49312f4412aac7360af403aae66e7300074",
          "commits" => [
            {
              "sha" => "57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1",
              "author" => {
                "email" => "chris.erin+chriserin@gmail.com",
                "name" => "Chris Erin"
              },
              "message" => "Scroll left and right with cursor",
              "distinct" => true,
              "url" => "https://api.github.com/repos/chriserin/seq27/commits/57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1"
            }
          ]
        },
        "public" => true,
        "created_at" => "2016-02-04T04:09:38Z"
      }
    ]
    DeveloperActivity.create_with_json(chriserin_events)

    # DEVELOPER ACTIVITY vekh
    vekh_events = [
      {
        "id" => "3605320086",
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
          "push_id" => 963193467,
          "size" => 1,
          "distinct_size" => 1,
          "ref" => "refs/heads/master",
          "head" => "57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1",
          "before" => "ea4dc49312f4412aac7360af403aae66e7300074",
          "commits" => [
            {
              "sha" => "57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1",
              "author" => {
                "email" => "chris.erin+chriserin@gmail.com",
                "name" => "Chris Erin"
              },
              "message" => "Scroll left and right with cursor",
              "distinct" => true,
              "url" => "https://api.github.com/repos/chriserin/seq27/commits/57779ce19b72f5c4ea4146e98e0d73efbf9bdcc1"
            }
          ]
        },
        "public" => true,
        "created_at" => "2016-02-04T04:09:38Z"
      }
    ]
    DeveloperActivity.create_with_json(events)
  end

  scenario "Developer sees commit to project", type: :request do
    # GET DEVS from members.json endpoint
    # chriserin
    # vekh

    # DEVELOPER vekh
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

    #DEVELOPER ACTIVITY vekh
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

    require 'pry'; binding.pry

    expect(developer['name']).to eq 'VEkh'
    expect(activity['repo_name']).to eq 'VEkh/sideprojects'
    expect(activity['commits'].values).to include 'Migrating to Hashrocket git'
  end

  xscenario "Developer sees links for each activity"
end
