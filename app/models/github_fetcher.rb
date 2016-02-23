class GithubFetcher < ActiveRecord::Base
  def self.fetcher
    self.first
  end

  def self.fetch(organization='hashrocket')
    client = Octokit::Client.new
    members = client.get("/orgs/#{organization}/members")

    developers = Developer.create_with_json_array(members.as_json)
    developers.each do |developer|
      activities = client.get("/users/#{developer.name}/events")
      DeveloperActivity.create_with_json(activities.as_json)
    end

    fetcher.update_attributes(last_fetched_at: Time.now)

    "#{client.rate_limit.remaining} github requests remaining"
  end
end

#------------------------------------------------------------------------------
# GithubFetcher
#
# Name            SQL Type             Null    Default Primary
# --------------- -------------------- ------- ------- -------
# id              integer              false   1       true   
# last_fetched_at timestamp with time zone false           false  
#
#------------------------------------------------------------------------------
