# frozen_string_literal: true

class Category < ApplicationRecord
  include Sluggable
  has_and_belongs_to_many :posts

  validates :name, presence: true, uniqueness: true
  validates :slug, uniqueness: true

  before_create -> { generate_slug(:name) }
end
