Rails.application.routes.draw do
  root to: 'application#index'

  resources :developers, only: [:index] do
    match 'fetch', on: :collection, via: [:get, :post]
  end
end
