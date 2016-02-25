Rails.application.routes.draw do
  root to: 'application#index'
  get '/readme', to: 'application#readme'

  resources :developers, only: [:index]
end
