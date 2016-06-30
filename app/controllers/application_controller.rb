class ApplicationController < ActionController::Base
  force_ssl
  protect_from_forgery with: :exception

  def index
    @title = "Hacktive"

    respond_to do |format|
      format.any { render "index" }
    end
  end

  def readme
    respond_to do |format|
      format.any { render "README.md" }
    end
  end
end
