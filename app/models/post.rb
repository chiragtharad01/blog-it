# frozen_string_literal: true

class Post < ApplicationRecord
  include Sluggable
  MAX_TITLE_LENGTH = 125
  MAX_DESCRIPTION_LENGTH = 10000
  VALID_TITLE_REGEX = /\A.*[a-zA-Z0-9].*\z/i

  enum :status, { draft: "draft", publish: "publish" }, default: :draft
  has_and_belongs_to_many :categories
  has_many :votes, dependent: :destroy
  belongs_to :user
  belongs_to :organization

  validates :title, presence: true, length: { maximum: MAX_TITLE_LENGTH }, format: { with: VALID_TITLE_REGEX }
  validates :description, presence: true, length: { maximum: MAX_DESCRIPTION_LENGTH }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create -> { generate_slug(:title) }
  def update_bloggable!
    update!(
      is_bloggable: (upvotes - downvotes) >= Constants::BLOGGABLE_THRESHOLD
    )
  end

  private

    def slug_not_changed
      if will_save_change_to_slug? && self.persisted?
        errors.add(:slug, I18n.t("post.slug.immutable"))
      end
    end
end
