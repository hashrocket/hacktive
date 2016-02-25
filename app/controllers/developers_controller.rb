# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def index
    fetcher = GithubFetcher.fetcher

    if fetcher.should_fetch?
      GithubFetcher.fetch
    end

    developers = Developer.active_developers(params[:organization])

    respond_to do |format|
      format.any { render json: developers }
    end
  end
end
