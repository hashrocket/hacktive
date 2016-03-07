# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class Developer < ActiveRecord::Base
  has_many :developer_activities, dependent: :destroy

  def self.active_developers(organization=nil)
    Developer.find_by_sql(%Q[
      select d.*, da.activities_json as activities,
      da.first_activity_timestamp
      from developers d

      -- Developer Activity
      join (
        select da1.developer_id,
        to_json(array_agg(da1)) activities_json,
        max(da1.event_occurred_at) as first_activity_timestamp

        from (
          select * from developer_activities
          where event_occurred_at between
          now() - interval '#{ENV['ACTIVITY_CUTOFF_DURATION']} seconds'
          and now()

          order by event_occurred_at desc
        ) da1

        group by da1.developer_id
      ) da on da.developer_id=d.id

      order by da.first_activity_timestamp desc
    ])
  end

  def self.create_with_json(payload)
    self.find_or_create_by!(
      id: payload['id'],
      name: payload['login']
    )
  end

  def self.create_with_json_array(members)
    member_ids = []

    developers = members.map do |member|
      member_ids << member['id']
      self.create_with_json(member)
    end

    excess_member_ids = self.where(%Q[
      id not in (#{member_ids.join(',')})
    ]).map(&:id)

    self.destroy(excess_member_ids)

    developers
  end
end

#------------------------------------------------------------------------------
# Developer
#
# Name SQL Type             Null    Default Primary
# ---- -------------------- ------- ------- -------
# id   integer              false           true   
# name text                 false           false  
#
#------------------------------------------------------------------------------
