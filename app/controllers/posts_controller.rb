# frozen_string_literal: true

class PostsController < ApplicationController
  rescue_from Pundit::NotAuthorizedError, with: :handle_authorization_error
  before_action :load_post, only: %i[show update destroy upvote downvote]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  def index
    @current_user = current_user
    posts = policy_scope(Post).includes(:user, :categories)
    @posts = PostFilterService.new(posts, params).process
  end

  def create
    post = Post.new(post_params.merge(user: current_user, organization_id: 1))
    authorize post
    post.save!
    render_notice(t("successfully_created", entity: "Post"))
  end

  def show
  end

  def update
    @post.update!(post_params)
    render_notice(t("successfully_updated", entity: "Post")) unless params.key?(:quite)
  end

  def destroy
    @post.destroy!
    render_notice(t("successfully_deleted", entity: "Post"))
  end

  def upvote
    VoteService.new(@post, current_user).upvote
  end

  def downvote
    VoteService.new(@post, current_user).downvote
  end

  private

    def load_post
      @post = Post.find_by!(slug: params[:slug])
      authorize @post
    end

    def post_params
      params.require(:post).permit(:title, :description, :status, category_ids: [])
    end

    def handle_authorization_error
      render_error(t("authorization.denied"), :forbidden)
    end
end
