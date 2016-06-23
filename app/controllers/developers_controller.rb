class DevelopersController < ApplicationController
  def index
    GithubFetchJob.perform_later
    developers = Developer.active_developers

    respond_to do |format|
      format.json { render json: developers }
    end
  end
end
