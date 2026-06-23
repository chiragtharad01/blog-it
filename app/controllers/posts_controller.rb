# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    @posts = Post.includes(:user, :categories).where(users: { organization_id: current_user.organization_id })
    if params[:category_ids].present?
      categories = params[:category_ids].split(",")
      post_ids = @posts.joins(:categories).where(categories: { id: categories }).pluck(:id)
      @posts = @posts.where(id: post_ids)
    end
  end

  def create
    post = Post.new(post_params)
    post.user_id = 2
    post.organization_id = 1
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
  end

  def update
    post = Post.find_by!(slug: params[:slug])
    post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quite)
  end

  def destroy
    post = Post.find_by!(slug: params[:slug])
    post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end
end
