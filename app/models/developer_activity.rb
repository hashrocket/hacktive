class DeveloperActivity < ActiveRecord::Base
  def self.create_with_json(activities)
    activities.each do |activity|
      event_type = activity['type']

      if !EventType::TYPE_WHITELIST.include?(event_type)
        next
      end

      payload = activity['payload']

      case event_type
        when 'IssuesEvent'
          issue = payload['issue']
          set_payload = {issue['id'] => payload['action']}

        when 'PullRequestEvent'
          pull_request = payload['pull_request']
          set_payload = {pull_request['id'] => payload['action']}

        when 'PushEvent'
          commits = payload['commits']
          set_payload = commits.reduce({}) do |object, commit|
            object[commit['sha']] = commit['message']
            object
          end

        when 'WatchEvent'
          set_payload = payload
      end

      self.where(
        event_id: activity['id']
      ).first_or_create!(
        developer_id: activity['actor']['id'],
        event_occurred_at: activity['created_at'],
        event_type: event_type,
        payload: set_payload,
        repo_name: activity['repo']['name']
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
# payload           hstore               false           false
# developer_id      integer              false           false
# event_occurred_at timestamp with time zone false           false
# event_id          bigint               false           false
# event_type        text                 false           false
# repo_name         text                 false           false
# created_at        timestamp with time zone false           false
#
#------------------------------------------------------------------------------
