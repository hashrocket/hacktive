class GithubFetchJob < ActiveJob::Base
  queue_as :github_fetch

  def perform(*args)
    GithubFetcher.fetch
  end
end
