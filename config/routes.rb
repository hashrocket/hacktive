Rails.application.routes.draw do
  resources :developers, only: [:index] do
    post 'fetch', on: :collection
  end
end
