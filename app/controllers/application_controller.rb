class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include SessionsHelper

  before_filter :print_stuff

  def print_stuff
    ap '$' * 80
    ap real_csrf_token(session)
  end
end
