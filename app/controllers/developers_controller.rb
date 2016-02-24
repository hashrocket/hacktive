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
    fetch_sleep = ENV['FETCH_SLEEP_DURATION'].to_i

    if(
      !!params[:fetch] &&
      fetcher.last_fetched_at < fetch_sleep.seconds.ago
    )
      GithubFetcher.fetch
    end

    developers = Developer.active_developers(params[:organization])

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
