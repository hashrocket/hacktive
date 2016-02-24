Rails.application.routes.draw do
  resources :developers, only: [:index]
end
