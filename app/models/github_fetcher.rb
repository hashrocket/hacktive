class GithubFetcher < ActiveRecord::Base
  # Silences postgres errors during seed
  validates_uniqueness_of :id

  def self.fetch(organization='hashrocket', team_name='Employees')
    client = Octokit::Client.new
    team = client.get(
      "/orgs/#{organization}/teams"
    ).select{|t| t.name =~ /#{team_name}/i}.first

    members = client.get(
      "/teams/#{team.id}/members",
      per_page: 100 # max page size
    )

    while client.last_response.rels[:next] do
      api_href = client.last_response.rels[:next].href
      members += client.get(api_href)
    end

    developers = Developer.create_with_json_array(members.as_json)
    developers.each do |developer|
      activities = client.get("/users/#{developer.name}/events")
      DeveloperActivity.create_with_json(activities.as_json)
    end

    fetcher.update_attributes(last_fetched_at: Time.now)

    requests_notice = "#{client.rate_limit.remaining} github requests remaining"
    puts requests_notice
    requests_notice
  end

  def self.fetcher
    self.first
  end

  def self.fetcher_sleep_duration
    github_client = Octokit::Client.new
    rate_limit = github_client.rate_limit.limit

    requests_per_fetch = 2 + Developer.count
    seconds_per_request = 3600.to_f / rate_limit

    seconds_per_request * requests_per_fetch # seconds / fetch
  end

  def should_fetch?
    client = Octokit::Client.new
    fetcher = GithubFetcher.fetcher
    fetch_sleep = ENV['FETCH_SLEEP_DURATION'].to_i

    client.rate_limit.remaining > 0 &&
    (
      fetcher.last_fetched_at < fetch_sleep.seconds.ago ||
      Developer.all.empty?
    )
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
