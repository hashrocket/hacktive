class DeveloperActivity < ActiveRecord::Base
  include Upsertable
  store_accessor :payload

  belongs_to :developer

  def self.create_with_json(activities)
    activities.each do |activity|
      actor = activity['actor']
      event_type = activity['type']
      payload = activity['payload']
      repo_name = activity['repo']['name']

      if !EventType::TYPE_WHITELIST.include?(event_type)
        next
      end

      case event_type
        when 'IssuesEvent'
          issue = payload['issue']
          activity_url = issue['html_url']

          payload_json = {
            'action' => payload['action'],
            'id' => issue['id'],
            'message' => issue['title']
          }
        when 'PullRequestEvent'
          pull_request = payload['pull_request']
          activity_url = pull_request['html_url']

          payload_json = {
            'action' => payload['action'],
            'id' => pull_request['id'],
            'message' => pull_request['title']
          }
        when 'PushEvent'
          commits = payload['commits']
          payload_json = {}
          payload_json['commits'] = commits.map do |commit|
            commit.to_h.slice(:message, :sha)
          end

          activity_url = "https://github.com/#{repo_name}/commit/#{commits.first['sha']}"
      end
      developer_activity = self.upsert!(
        {event_id: activity['id']},
        {
          activity_url: activity_url,
          developer_id: activity['actor']['id'],
          event_occurred_at: activity['created_at'],
          event_id: activity['id'],
          event_type: event_type,
          payload: payload_json,
          repo_name: repo_name
        }
      )
    end
  end
end

#------------------------------------------------------------------------------
# DeveloperActivity
#
# Name              SQL Type             Null    Default Primary
# ----------------- -------------------- ------- ------- -------
# id                integer              false           true
# payload           jsonb                false           false
# developer_id      integer              false           false
# event_occurred_at timestamp with time zone false           false
# event_id          bigint               false           false
# event_type        text                 false           false
# repo_name         text                 false           false
# created_at        timestamp with time zone false           false
# activity_url      text                 true            false
#
#------------------------------------------------------------------------------
