class User < ActiveRecord::Base
  before_save { self.email = email.downcase }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,
            presence: true,
            length: { maximum: 300 },
            format: { with: VALID_EMAIL_REGEX }

  has_secure_password
  validates :password,
            length: { minimum: 8 }

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ?
        BCrypt::Engine::MIN_COST : BCrypt::Engine::cost

    BCrypt::Password.create(string, cost: cost)
  end
end
