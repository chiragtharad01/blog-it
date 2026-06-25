# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @category = build(:category)
  end

  def test_should_create_valid_category
    assert @category.valid?
  end

  def test_name_should_not_be_blank
    @category.name = ""
    assert_not @category.valid?
  end

  def test_name_should_be_unique
    create(:category, name: "Tech")
    duplicate_category = build(:category, name: "Tech")
    assert_not duplicate_category.valid?
  end

  def test_slug_should_be_unique
    create(:category, name: "Ruby")
    create(:category, name: "Ruby!")

    category = create(:category, name: "Ruby@")

    assert_equal "ruby-3", category.slug
  end
end
