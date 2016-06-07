# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def index
    @title = "Hacktive"

    GithubFetchJob.perform_later

    developers = Developer.active_developers

    respond_to do |format|
      format.html { render "index" }
      format.json { render json: developers }
    end
  end
end
