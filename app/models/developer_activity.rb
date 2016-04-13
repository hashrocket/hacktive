class DeveloperActivity < ActiveRecord::Base
  belongs_to :developer

  def self.create_with_json(activities)
    activities.each do |activity|
      actor = activity['actor']
      event_type = activity['type']
      repo_name = activity['repo']['name']

      if !EventType::TYPE_WHITELIST.include?(event_type)
        next
      end

      payload = activity['payload']

      case event_type
        when 'IssuesEvent'
          issue = payload['issue']
          set_payload = {issue['id'] => payload['action']}

          activity_url = issue['html_url']
        when 'PullRequestEvent'
          pull_request = payload['pull_request']
          set_payload = {pull_request['id'] => payload['action']}

          activity_url = pull_request['html_url']
        when 'PushEvent'
          commits = payload['commits']
          set_payload = commits.reduce({}) do |object, commit|
            object[commit['sha']] = commit['message']
            object
          end

          activity_url = "https://github.com/#{repo_name}/commit/#{commits.first['sha']}"
      end

      self.where(
        event_id: activity['id']
      ).first_or_create!(
        activity_url: activity_url,
        developer_id: activity['actor']['id'],
        event_occurred_at: activity['created_at'],
        event_type: event_type,
        payload: set_payload,
        repo_name: repo_name
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
