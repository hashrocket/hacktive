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
      select d.*, daj.array_json as activities
      from developers d
      join (
        select daj1.developer_id,
        to_json(array_agg(daj1)) array_json
        from developer_activities daj1
        group by daj1.developer_id
      ) daj on daj.developer_id=d.id
    ])

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
