# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def fetch
    GithubFetcher.fetch(params[:organization])
    developers =  Developer.active_developers(params[:organization])

    respond_to do |format|
      format.json { render json: developers }
    end
  end

  def index
    developers = Developer.active_developers

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
