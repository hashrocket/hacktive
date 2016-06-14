require 'rails_helper'

RSpec.describe Developer do
  context '::active_developers' do
    it "should return ordered array of organization's active developers" do
      developers = [
        {
          "id"=>2782858,
          "name"=>"jwworth",
          "recently_active_at"=>Time.parse("2016-02-19 21:04:43 UTC")
        },
        {
          "id"=>6863100,
          "name"=>"chadbrading",
          "recently_active_at"=>Time.parse("2016-02-18 21:08:24 UTC")
        }
      ]

      first_developer = developers.first.as_json
      second_developer = developers.second.as_json

      expect(first_developer['recently_active_at']).to(
        be > second_developer['recently_active_at']
      )
    end
  end

  context '::create_with_json_array' do
    it 'should add multiple developers to database' do
      hashrocket_memebers = [
        {
          "login" => "adennis4",
          "id" => 785345,
        },
        {
          "login" => "briandunn",
          "id" => 93310
        }
      ]

      # Then I see a card for each member of the organization
      Developer.create_with_json_array(hashrocket_memebers)

      expect(Developer.count).to eq hashrocket_memebers.length
    end

    it "should destroy excess developers" do
      create(:developer)

      client = Octokit::Client.new
      github_developers = client.get('/orgs/hashrocket/members')
      Developer.create_with_json_array(github_developers)

      expect(Developer.count).to eq github_developers.count
    end
  end
end
