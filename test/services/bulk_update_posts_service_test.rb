# frozen_string_literal: true

require "test_helper"
class BulkUpdatePostsServiceTest < ActiveSupport::TestCase
  def setup
    @draft_posts = create_list(:post, 3, status: "draft")
    @published_posts = create_list(:post, 2, status: "publish")
  end

  def test_updates_draft_posts_with_different_status
    BulkUpdatePostsService.new(Post.where(status: "draft"), "publish").process

    @draft_posts.each do |post|
      assert_equal "publish", post.reload.status
    end
  end

  def test_does_not_update_draft_posts_with_same_status
    BulkUpdatePostsService.new(Post.where(status: "draft"), "draft").process

    @draft_posts.each do |post|
      assert_equal "draft", post.reload.status
    end
  end

  def test_updates_publish_posts_with_different_status
    BulkUpdatePostsService.new(Post.where(status: "publish"), "draft").process

    @published_posts.each do |post|
      assert_equal "draft", post.reload.status
    end
  end

  def test_does_not_update_publish_posts_with_same_status
    BulkUpdatePostsService.new(Post.where(status: "publish"), "publish").process

    @published_posts.each do |post|
      assert_equal "publish", post.reload.status
    end
  end
end
