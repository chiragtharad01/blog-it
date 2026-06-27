# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = MyPostsFilterService.new(current_user.posts.includes(:categories), my_posts_params).process
  end

  private

    def my_posts_params
      params.fetch(:my_posts, {}).permit(:title, :status, category_ids: [])
    end
end
