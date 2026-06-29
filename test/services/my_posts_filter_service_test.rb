# frozen_string_literal: true

require "test_helper"

class MyPostsFilterServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @ruby = create(:category, name: "Ruby", slug: "ruby")
    @rails = create(:category, name: "Rails", slug: "rails")
    @draft_post = create(
      :post,
      title: "Learning Ruby",
      status: "draft",
      user: @user,
      organization: @organization,
      categories: [@ruby]
    )

    @published_post = create(
      :post,
      title: "Rails Guide",
      status: "publish",
      user: @user,
      organization: @organization,
      categories: [@rails]
    )

    @post = Post.all
  end

  def test_returns_all_posts_when_no_filters_are_given
    filtered_posts = MyPostsFilterService.new(@post, {}).process
    assert_equal Post.count, filtered_posts.count
  end

  def test_filters_posts_by_title
    filtered_posts = MyPostsFilterService.new(@post, { title: "ruby" }).process
    assert_includes filtered_posts, @draft_post
    assert_not_includes filtered_posts, @published_post
  end

  def test_filters_posts_by_status
    filtered_posts = MyPostsFilterService.new(@post, { status: "draft" }).process
    assert_includes filtered_posts, @draft_post
    assert_not_includes filtered_posts, @published_post
  end

  def test_filters_posts_by_category
    filtered_posts = MyPostsFilterService.new(@post, { category_ids: ["ruby"] }).process
    assert_includes filtered_posts, @draft_post
    assert_not_includes filtered_posts, @published_post
  end

  def test_filters_posts_by_everything
    filtered_posts = MyPostsFilterService.new(@post, { status: "draft", title: "ruby", category_ids: ["ruby"] }).process
    assert_includes filtered_posts, @draft_post
    assert_not_includes filtered_posts, @published_post
  end
end
