require 'rails_helper'

RSpec.describe Developer do
  context '#create_with_json_array' do
    it 'should add multiple developers to database' do
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
  end
end
