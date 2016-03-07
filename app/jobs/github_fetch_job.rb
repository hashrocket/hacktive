class GithubFetchJob < ActiveJob::Base
  queue_as :github_fetch

  def perform(organization='hashrocket', team='Employees')
    fetcher = GithubFetcher.fetcher
    GithubFetcher.fetch(organization, team)

    GithubFetchJob.set(
      wait: fetcher.fetcher_sleep_duration
    ).perform_later
  end
end
