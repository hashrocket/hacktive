class GithubFetcher < ActiveRecord::Base
  # Silences postgres errors during seed
  validates_uniqueness_of :id

  def self.fetch(organization='hashrocket', team_name='Employees')
    client = Octokit::Client.new
    requests_count = 0

    if client.rate_limit.remaining > 0
      team = client.get(
        "/orgs/#{organization}/teams"
      ).select{|t| t.name =~ /#{team_name}/i}.first
      requests_count += 1

      members = client.get(
        "/teams/#{team.id}/members",
        per_page: 100 # max page size
      )
      requests_count += 1

      while client.last_response.rels[:next] do
        api_href = client.last_response.rels[:next].href
        members += client.get(api_href)
        requests_count += 1
      end

      developers = Developer.create_with_json_array(members.as_json)
      developers.each do |developer|
        activities = client.get("/users/#{developer.name}/events")
        requests_count += 1
        DeveloperActivity.create_with_json(activities.as_json)
      end

      fetcher.update_attributes(
        last_fetched_at: Time.now,
        requests: requests_count
      )

      "#{client.rate_limit.remaining} github requests remaining"
    end
  end

  def self.fetcher
    self.first
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
# id              integer              false   1       true
# last_fetched_at timestamp with time zone true            false
# requests        integer              false   0       false
#
#------------------------------------------------------------------------------
