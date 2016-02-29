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

    fetcher = GithubFetcher.fetcher

    if fetcher.should_fetch?
      GithubFetchJob.perform_later
    end

    developers = Developer.active_developers(params[:organization])

    respond_to do |format|
      format.html do
        render(
          'index',
          formats: [:html],
          handlers: [:slim]
        )
      end

      format.json { render json: developers }
    end
  end
end
