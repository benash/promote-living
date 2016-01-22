FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password 'abcd1234'
  end
end