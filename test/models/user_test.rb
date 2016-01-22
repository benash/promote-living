require 'test_helper'

class UserTest < ActiveSupport::TestCase
  describe 'users' do

    describe 'email' do
      it 'needs an email' do
        build(:user, email: nil).wont_be :valid?
      end

      it 'needs a short enough email' do
        email_300 = "#{'a' * 294}@a.com"
        email_301 = "#{'a' * 295}@a.com"

        build(:user, email: email_300).must_be :valid?
        build(:user, email: email_301).wont_be :valid?
      end

      it 'needs a real-looking email' do
        invalid_emails = %w(
        ben@hotmail
        hotmail.com
        @hotmail.com
      )

        invalid_emails.each do |email|
          build(:user, email: email).wont_be :valid?
        end

        build(:user, email: 'ben@hotmail.com').must_be :valid?
      end

      it 'needs a unique email' do
        user = create(:user)

        [ user.email.downcase, user.email.upcase ].each do |email|
          dup = build(:user, email: email)
          -> { dup.save }.must_raise ActiveRecord::RecordNotUnique
        end
      end

      it 'downcases emails' do
        user = create(:user, email: 'BEN@HOTMAIL.COM')
        user.email.must_equal 'ben@hotmail.com'
      end
    end

    describe 'password' do
      it 'needs to be there' do
        build(:user, password: nil).wont_be :valid?
      end

      it 'must be 8 characters long' do
        build(:user, password: '1234567').wont_be :valid?
      end
    end

    it 'authenticates' do
      password = 'abcd1234'
      user = build(:user, password: password)
      user.authenticate(password).must_be true
      user.authenticate('abc123').must_be false
    end
  end
end