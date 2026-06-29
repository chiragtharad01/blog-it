# frozen_string_literal: true

require "test_helper"

class PostFilterServiceTest < ActiveSupport::TestCase
  def setup
    @category = create(:category)

    @matching_post = create(:post)
    @matching_post.categories << @category

    @other_post = create(:post)
  end

  def test_should_return_all_posts_when_no_filters_are_given
    posts = PostFilterService.new(Post.all, {}).process

    assert_equal Post.count, posts.count
  end

  def test_should_filter_posts_by_category
    posts = PostFilterService.new(
      Post.all,
      { categories: @category.slug }
    ).process

    assert_equal [@matching_post.id], posts.pluck(:id)
  end

  def test_should_return_empty_when_category_does_not_exist
    posts = PostFilterService.new(
      Post.all,
      { categories: "invalid-category" }
    ).process

    assert_empty posts
  end
end
