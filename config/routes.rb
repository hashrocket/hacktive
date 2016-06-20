Rails.application.routes.draw do
  require 'resque/server'
  mount Resque::Server.new, :at => "/resque"

  root to: 'application#index'
  get '/readme', to: 'application#readme'
end
