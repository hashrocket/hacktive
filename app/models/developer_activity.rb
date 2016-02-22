class DeveloperActivity < ActiveRecord::Base
  def self.create_with_json(activities)
    activities.each do |activity|
      case activity['type']
        when "PushEvent"
          commits = activity['payload']['commits']
          set_payload = commits.reduce({}) do |object, commit|
            object[commit['sha']] = commit['message']
            object
          end

        when "IssuesEvent"
          payload = activity['payload']
          issue = payload['issue']
          set_payload = {issue['id'] => payload['action']}
      end

      self.create!(
        developer_id: activity['actor']['id'],
        event_occurred_at: activity['created_at'],
        event_id: activity['id'],
        event_type: activity['type'],
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
