CatarseIugu::Engine.routes.draw do
  resources :iugu, only: [], path: 'payment/iugu' do
    member do
      get  :review
      post :pay
      get  :success
      get  :cancel
    end
    collection do
      post :invoice_hook
    end
  end
end
