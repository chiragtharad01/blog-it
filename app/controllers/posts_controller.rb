# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    puts "HERE"
    posts = Post.all
    puts posts
    # render status: :ok, json: { posts: posts }
    render_json({ posts: })
  end

  def create
    # puts post_params
    post = Post.new(post_params)
    post.save!
    render_notice(t("successfully_created"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
