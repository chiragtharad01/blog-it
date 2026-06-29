# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :my_posts, only: :index do
      delete "bulk_delete", on: :collection
      patch "bulk_update_status", on: :collection
    end
    resources :posts, except: %i[new edit], param: :slug do
      patch "upvote", on: :member
      patch "downvote", on: :member
      resource :report, only: %i[create], module: :posts do
        get :download, on: :collection
      end
    end
    resources :users, only: %i[index create show]
    resources :categories, only: %i[index create], param: :slug
    resource :session, only: %i[create destroy]
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"
  get "*path", to: "home#index", via: :all
  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
