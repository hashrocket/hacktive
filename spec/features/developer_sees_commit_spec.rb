require 'rails_helper'

RSpec.feature "Hacker list" do
  scenario "Developer sees commit to project", type: :request do


    # GET DEVS from members.json endpoint
    # chriserin
    # vekh
    #



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

    get '/developers.json'
    developer = JSON.parse(response.body).first
    activity = developer['activities'].first

    expect(developer['name']).to eq 'chriserin'
    expect(activity['repo_name']).to eq 'chriserin/seq27'
    expect(activity['commits'].values).to include 'Scroll left and right with cursor'

    expect(developer['name']).to eq 'vkeh'
    expect(activity['repo_name']).to eq 'chriserin/seq27'
    expect(activity['commits'].values).to include 'Scroll left and right with cursor'
  end

  xscenario "Developer sees links for each activity"
end
