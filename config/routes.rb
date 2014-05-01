Rails.application.routes.draw do
  # devise_for route with callback
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks"}
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  resources :users

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'
  get 'welcome/getlocation' => 'welcome#getlocation'
  get 'welcome/getmerchants' => 'welcome#getmerchants'
  get 'welcome/getmenu' => 'welcome#getmenu'
  get 'welcome/getguesttoken' => 'welcome#getguesttoken'
  post 'welcome/addtoguestcart' => 'welcome#addtoguestcart'
  get 'welcome/retrieveguestcart' => 'welcome#retrieveguestcart'
  get 'welcome/thirdpartyauthorize' => 'welcome#third_party_authorize'
  post 'api/third_party/authorize' => 'welcome#authorize'
  post 'welcome/makevenmopayment' => 'welcome#makevenmopayment'
  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
