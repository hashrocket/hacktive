# == Schema Information
#
# Table name: developers
#
#  id   :integer          not null, primary key
#  name :text             not null
#

class DevelopersController < ApplicationController
  def fetch
    fetcher = GithubFetcher.fetcher
    fetch_sleep = ENV['FETCH_SLEEP_DURATION'].to_i

    if fetcher.last_fetched_at < fetch_sleep.seconds.ago
      fetched = true
      GithubFetcher.fetch(params[:organization])
    else
      fetched = false
    end

    developers = Developer.active_developers(params[:organization])

    resp = {
      fetched: fetched,
      developers: developers
    }

    respond_to do |format|
      format.json { render json: resp }
    end
  end

  def index
    developers = Developer.active_developers

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
