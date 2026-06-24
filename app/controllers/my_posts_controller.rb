# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = current_user.posts.includes(:categories)
  end
end
