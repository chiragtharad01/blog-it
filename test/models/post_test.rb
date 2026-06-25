# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = create(
      :post,
      user: @user,
      organization: @organization
    )
  end

  # test "the truth" do
  #   assert true
  # end
  def test_should_create_valid_post
    assert @post.valid?
  end

  def test_title_should_not_be_blank
    @post.title = ""
    assert_not @post.valid?
    assert_includes @post.errors[:title], "can't be blank"
  end

  def test_title_should_not_exceed_max_length
    @post.title = "a" * (Post::MAX_TITLE_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_title_should_contain_alphanumeric_characters
    @post.title = "!!!"
    assert_not @post.valid?
  end

  def test_title_with_alphanumeric_characters_should_be_valid
    @post.title = "fad1"
    assert @post.valid?
  end

  def test_description_should_not_be_blank
    @post.description = ""
    assert_not @post.valid?
    assert_includes @post.errors[:description], "can't be blank"
  end

  def test_description_should_not_exceed_max_length
    @post.description = "a" * (Post::MAX_DESCRIPTION_LENGTH + 1)
    assert_not @post.valid?
  end

  def test_bloggable_should_not_be_nil
    @post.is_bloggable = nil
    assert_not @post.valid?
  end

  def test_user_should_be_present
    @post.user = nil
    assert_not @post.valid?
  end

  def test_organization_should_be_present
    @post.organization = nil
    assert_not @post.valid?
  end

  def test_default_status_should_be_draft
    post = create(
      :post,
      user: @user,
      organization: @organization
    )
    assert_equal "draft", post.status
  end

  def test_slug_should_be_generated
    post = create(
      :post,
      title: "Ruby on",
      user: @user,
      organization: @organization
    )
    assert_equal "ruby-on", post.slug
  end

  def test_unique_slug_should_be_generated
    create(
      :post,
      title: "Ruby on",
      user: @user,
      organization: @organization
    )
    post1 = create(
      :post,
      title: "Ruby on",
      user: @user,
      organization: @organization
    )
    assert_equal "ruby-on-2", post1.slug
  end

  def test_slug_cannot_be_updated
    post = create(
      :post,
      user: @user,
      organization: @organization
    )
    post.slug = "random"
    assert_not post.valid?
    assert_includes post.errors[:slug], I18n.t("post.slug.immutable")
  end
end
