require 'rails_helper'

RSpec.describe GithubFetchJob, type: :job do
  include ActiveJob::TestHelper

  let(:fetcher) { create(:github_fetcher) }

  scenario 'Polling has not started', type: :request do
    fetcher.update_attributes(last_fetched_at: nil)

    expect_any_instance_of(GithubFetcher).to(
      receive(:fetch).and_return(true)
    )

    GithubFetchJob.perform_now

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher has slept long enough', type: :request do
    fetcher.update_attributes(requests: 10)

    sleep_duration = fetcher.sleep_duration
    fetcher.update_attributes(
      last_fetched_at: (sleep_duration * 2).seconds.ago
    )

    expect_any_instance_of(GithubFetcher).to(
      receive(:fetch).and_return(true)
    )

    GithubFetchJob.perform_now

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher not slept long enough', type: :request do
    fetcher.update_attributes(requests: 10)

    sleep_duration = fetcher.sleep_duration
    fetcher.update_attributes(
      last_fetched_at: Time.now
    )

    GithubFetchJob.perform_now(fetch: false)
    assert_enqueued_jobs 0
  end


  scenario "Repeat after the fetcher's sleep duration expires" do
    fetcher.update_attributes(requests: 1)

    sleep fetcher.sleep_duration

    expect_any_instance_of(GithubFetcher).to(
      receive(:fetch).and_return(true)
    )

    GithubFetchJob.perform_now

    assert_enqueued_jobs 1
  end
end
