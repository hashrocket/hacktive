class GithubFetchJob < ActiveJob::Base
  queue_as :github_fetch

  def perform(**args)
    defaults = {
      fetch: true,
      organization: 'hashrocket',
      team: 'Employees'
    }

    args = defaults.merge(args)
    fetch = args[:fetch]
    organization = args[:organization]
    team = args[:team]

    fetcher = GithubFetcher.find_or_create_by(
      organization: organization
    )

    if fetcher.should_fetch?
      if fetch
        fetcher.fetch(team: team)
      end

      fetcher.reload

      GithubFetchJob.set(
        wait: fetcher.sleep_duration.seconds
      ).perform_later(args)
    end
  end
end
