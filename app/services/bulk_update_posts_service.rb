# frozen_string_literal: true

class BulkUpdatePostsService
  attr_reader :posts, :status
  def initialize(posts, status)
    @posts = posts
    @status = status
  end

  def process
    posts.find_each do |post|
      update_post(post)
    end
  end

  private

    def update_post(post)
      return if post.status == status

      post.update!(status:)
    end
end
