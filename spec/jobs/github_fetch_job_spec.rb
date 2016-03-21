require 'rails_helper'

RSpec.describe GithubFetchJob, type: :job do
  include ActiveJob::TestHelper

  before do
    event_types = [
      'IssuesEvent',
      'PullRequestEvent',
      'PushEvent'
    ]

    event_types.each do |event_type|
      EventType.find_or_create_by(name: event_type)
    end

    @fetcher = GithubFetcher.create!(
      id: 1,
      last_fetched_at: Time.now
    )
  end

  scenario 'Polling has not started', type: :request do
    @fetcher.update_attributes(last_fetched_at: nil)

    GithubFetchJob.perform_now(fetch: false)

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher has slept long enough', type: :request do
    @fetcher.update_attributes(requests: 10)

    sleep_duration = @fetcher.sleep_duration
    @fetcher.update_attributes(
      last_fetched_at: (sleep_duration * 2).seconds.ago
    )

    GithubFetchJob.perform_now(fetch: false)

    assert_enqueued_jobs 1
  end

  scenario 'Fetcher not slept long enough', type: :request do
    @fetcher.update_attributes(requests: 10)

    sleep_duration = @fetcher.sleep_duration
    @fetcher.update_attributes(
      last_fetched_at: Time.now
    )

    GithubFetchJob.perform_now(fetch: false)
    assert_enqueued_jobs 0
  end


  scenario "Repeat after the fetcher's sleep duration expires" do
    @fetcher.update_attributes(requests: 1)

    sleep @fetcher.sleep_duration
    GithubFetchJob.perform_now(fetch: false)

    assert_enqueued_jobs 1
  end
end
