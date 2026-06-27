# frozen_string_literal: true

class MyPostsController < ApplicationController
  def index
    @posts = MyPostsFilterService.new(current_user.posts.includes(:categories), my_posts_params).process
  end

  def bulk_delete
    posts = current_user.posts.where(id: bulk_params[:ids])
    posts.destroy_all
    render_notice(t("bulk_delete"))
  end

  def bulk_update_status
    posts = current_user.posts.where(id: bulk_params[:ids])
    BulkUpdatePostsService.new(
      posts,
      bulk_params[:status]
    ).process

    render_notice(t("bulk_update", entity: bulk_params[:status]))
  end

  private

    def my_posts_params
      params.fetch(:my_posts, {}).permit(:title, :status, category_ids: [])
    end

    def bulk_params
      params.require(:bulk_params).permit(:status, ids: [])
    end
end
