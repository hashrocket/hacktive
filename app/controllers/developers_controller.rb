# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def index
    @title = 'Hacktive'

    fetcher = GithubFetcher.fetcher

    if !fetcher.polling?
      GithubFetchJob.perform_later(params[:organization])
    end

    developers = Developer.active_developers(params[:organization])

    respond_to do |format|
      format.html { render 'index' }
      format.json { render json: developers }
    end
  end
end
