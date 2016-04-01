FactoryGirl.define do
  factory :github_fetcher do
    last_fetched_at Time.now
  end
end
