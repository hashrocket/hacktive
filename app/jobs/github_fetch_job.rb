class GithubFetchJob < ActiveJob::Base
  queue_as :github_fetch

  def perform(organization='hashrocket', team='Employees')
    loop do
      GithubFetcher.fetch(organization, team)

      sleep GithubFetcher.fetcher_sleep_duration
    end
  end
end
