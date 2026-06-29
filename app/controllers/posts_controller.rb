# frozen_string_literal: true

class PostsController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  def index
    @current_user = current_user
    posts = policy_scope(Post)
    # @posts = posts.includes(:user, :categories).where(users: { organization_id: current_user.organization_id })
    @posts = posts.includes(:user, :categories)
    if params[:categories].present?
      categories = params[:categories].split(",")
      post_ids = @posts.joins(:categories).where(categories: { slug: categories }).pluck(:id)
      @posts = @posts.where(id: post_ids)
    end
  end

  def create
    post = Post.new(post_params)
    authorize post
    post.user_id = @current_user.id
    post.organization_id = 1
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
    @post = Post.find_by!(slug: params[:slug])
    authorize @post
  end

  def update
    post = Post.find_by!(slug: params[:slug])
    authorize post
    post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quite)
  end

  def destroy
    post = Post.find_by!(slug: params[:slug])
    authorize post
    post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  def upvote
    post = Post.find_by!(slug: params[:slug])

    authorize post
    VoteService.new(post, current_user).upvote
  end

  def downvote
    post = Post.find_by!(slug: params[:slug])

    authorize post
    VoteService.new(post, current_user).downvote
  end

  private

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end
end
