# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    title { Faker::Book.title }
    description { Faker::Lorem.paragraph(sentence_count: 5) }
    is_bloggable { true }
    status { :draft }

    association :user
    association :organization
  end
end
