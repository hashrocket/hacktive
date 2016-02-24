Rails.application.routes.draw do
  root to: 'application#index'
  resources :developers, only: [:index]
end
