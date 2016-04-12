class GithubFetcher < ActiveRecord::Base
  attr_accessor :client

  def fetch(team: "Employees")
    @client = Octokit::Client.new

    if client.rate_limit.remaining >= self.requests
      self.requests = 0

      members = get_team_members(team)

      developers = Developer.create_with_json_array(members)
      developers.each do |developer|
        activities = client.get("/users/#{developer.login}/events/public")
        self.requests += 1
        DeveloperActivity.create_with_json(activities)
      end

      self.update_attributes(last_fetched_at: Time.now)

      puts status = "#{client.rate_limit.remaining} github requests remaining"
      status
    end
  end

  def get_team_members(team)
    team_response = @client.get(
      "/orgs/#{self.organization}/teams"
    ).select{|t| t.name =~ /#{team}/i}.first
    self.requests += 1

    members = @client.get(
      "/teams/#{team_response.id}/members",
      per_page: 100 # max page size
    )
    self.requests += 1

    while @client.last_response.rels[:next] do
      api_href = @client.last_response.rels[:next].href
      members += @client.get(api_href)
      self.requests += 1
    end

    full_members = members.map do |member|
      full_member = @client.get("/users/#{member.login}")
      self.requests += 1

      full_member
    end
  end

  def should_fetch?
    !self.last_fetched_at ||
    (
      self.last_fetched_at <
      self.sleep_duration.seconds.ago
    )
  end

  def sleep_duration
    client = Octokit::Client.new
    rate_limit = client.rate_limit.limit

    requests_per_fetch = self.requests
    seconds_per_request = 3600.to_f / rate_limit

    seconds_per_request * requests_per_fetch # seconds / fetch
  end
end

#------------------------------------------------------------------------------
# GithubFetcher
#
# Name            SQL Type             Null    Default Primary
# --------------- -------------------- ------- ------- -------
# id              integer              false           true   
# last_fetched_at timestamp with time zone true            false  
# requests        integer              false   0       false  
# organization    text                 false           false  
#
#------------------------------------------------------------------------------
