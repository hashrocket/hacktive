class DevelopersController < ApplicationController
  def index
    GithubFetchJob.perform_later
    developers = Developer.active_developers

    render json: developers
  end
end
