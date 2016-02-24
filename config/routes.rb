Rails.application.routes.draw do
  root to: 'application#index'

  resources :developers, only: [:index] do
    post 'fetch', on: :collection
  end
end
