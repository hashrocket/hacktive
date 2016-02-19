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
      select d.*, da.array_json as activities,
      da.most_recent_date
      from developers d

      -- Developer Activity
      join (
        select da1.developer_id,
        to_json(array_agg(da1)) array_json,
        min(
          da1.event_occurred_at
          order by event_occurred_at desc
        ) as most_recent_date
        from developer_activities da1
        group by da1.developer_id
      ) da on da.developer_id=d.id

      order by da.most_recent_date desc
    ])

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
