# == Schema Information
#
# Table name: developer_activities
#
#  id                :integer          not null, primary key
#  commits           :hstore           not null
#  developer_id      :integer          not null
#  event_occurred_at :datetime         not null
#  event_id          :integer          not null
#  event_type        :text             not null
#  repo_name         :text             not null
#  created_at        :datetime         not null
#

class DeveloperActivity < ActiveRecord::Base
  def self.create_with_json(activities)
    activities.each do |activity|
      self.create!(
        commits: activity['payload']['commits'].reduce({}) {|object, commit| object[commit['sha']] = commit['message']; object },
        developer_id: activity['actor']['id'],
        event_occurred_at: activity['created_at'],
        event_id: activity['id'],
        event_type: activity['type'],
        repo_name: activity['repo']['name']
      )
    end
  end
end
