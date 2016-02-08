class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      # @user.send_activation_email
      # flash[:info] = "Please check your email to activate your account."
      render json: @user
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
        :first_name,
        :last_name,
        :birth_day,
        :birth_month,
        :birth_year,
        :email,
        :password,
    )
  end
end
