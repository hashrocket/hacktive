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

    if !!params[:fetch] && fetcher.should_fetch?
      GithubFetcher.fetch
    end

    developers = Developer.active_developers(params[:organization])

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
