require 'rails_helper'

RSpec.describe GithubFetchJob, type: :job do
  include ActiveJob::TestHelper

  scenario 'Polling has not started', type: :request do
    fetcher = GithubFetcher.fetcher
    fetcher.update_attributes(last_fetched_at: nil)

    GithubFetchJob.perform_now(fetch: false)

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher has slept long enough', type: :request do
    fetcher = GithubFetcher.fetcher
    fetcher.update_attributes(requests: 10)

    sleep_duration = fetcher.sleep_duration
    fetcher.update_attributes(
      last_fetched_at: (sleep_duration * 2).seconds.ago
    )

    GithubFetchJob.perform_now(fetch: false)

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher not slept long enough', type: :request do
    fetcher = GithubFetcher.fetcher
    fetcher.update_attributes(requests: 10)

    sleep_duration = fetcher.sleep_duration
    fetcher.update_attributes(
      last_fetched_at: Time.now
    )

    GithubFetchJob.perform_now(fetch: false)
    assert_enqueued_jobs 0
  end


  scenario "Repeat after the fetcher's sleep duration expires" do
    fetcher = GithubFetcher.fetcher
    fetcher.update_attributes(requests: 1)

    GithubFetchJob.perform_now(fetch: false)
    fetcher = GithubFetcher.fetcher

    assert_enqueued_jobs 1
  end
end
