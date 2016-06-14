# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class Developer < ActiveRecord::Base
  has_many :developer_activities, dependent: :destroy

  def self.active_developers
    Developer.find_by_sql(
      <<-SQL
        with recently_active_developer_ids as (
          select distinct developer_id from developer_activities
          where event_occurred_at > (
            now() - interval '#{ENV['ACTIVITY_CUTOFF_DURATION']} seconds'
          )
        )

        select d.*, to_json(array_agg(
          da order by da.event_occurred_at desc
        )) activities,
        max(da.event_occurred_at) recently_active_at

        from developers d
        join recently_active_developer_ids rad on d.id=rad.developer_id

        join lateral (
          select * from developer_activities
          where developer_id=d.id
          order by event_occurred_at desc
          limit 3
        ) da on da.developer_id=d.id

        group by d.id
        order by max(da.event_occurred_at) desc
      SQL
    )
  end

  def self.create_with_json(payload)
    self.find_or_initialize_by(
      id: payload["id"]
    ).tap do |developer|
      developer.attributes = {
        login: payload["login"],
        name: payload["name"]
      }

      developer.save!
    end
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
# Name  SQL Type             Null    Default Primary
# ----- -------------------- ------- ------- -------
# id    integer              false           true
# login text                 false           false
# name  text                 true            false
#
#------------------------------------------------------------------------------
