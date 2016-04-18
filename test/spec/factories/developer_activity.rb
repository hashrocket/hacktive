FactoryGirl.define do
  factory :developer_activity do
    developer
    event_id "3650080452"
    event_occurred_at Time.now.to_s
    event_type "PushEvent"
    payload {{
      "30cbf09da0778e4f1eb0bc94575d858d68ea95d6" => "Migrating to Hashrocket git"
    }}
    repo_name "VEkh/sideprojects"
  end
end
