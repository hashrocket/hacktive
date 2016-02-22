# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def index
    developers = Developer.find_by_sql(%Q[
      select d.*, da.activities_json as activities,
      da.most_recent_date
      from developers d

      -- Developer Activity
      join (
        select da1.developer_id,
        to_json(array_agg(da1)) activities_json,
        min(da1.event_occurred_at) as most_recent_date

        from (
          select * from developer_activities
          where event_occurred_at between
          '#{ENV["ACTIVITY_CUTTOFF_DATE"]}'::timestamp and
          now()

          order by event_occurred_at desc
        ) da1

        group by da1.developer_id
      ) da on da.developer_id=d.id

      order by da.most_recent_date desc
    ])

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
