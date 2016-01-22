Rails.application.routes.draw do
  root 'welcome#index'

  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
end
