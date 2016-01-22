class SessionsController < ApplicationController

  def create
    email = params[:session][:email].downcase
    user = User.find_by(email: email)
    if user && user.authenticate(params[:session][:password])
      login user
      # params[:session][:remember_me] == '1' ? remember(user) : forget(user)
      render json: current_user
    else
      head :unauthorized
    end
  end
end
