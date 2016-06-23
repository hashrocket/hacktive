class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
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
