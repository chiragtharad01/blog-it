# frozen_string_literal: true

class MyPostsFilterService
  attr_reader :posts, :params
  def initialize(posts, params)
    @posts = posts
    @params = params
  end

  def process
    filter_by_title
    filter_by_status
    filter_by_categories

    posts
  end

  private

    def filter_by_title
      return if params[:title].blank?

      @posts = posts.where("LOWER(title) LIKE ?", "%#{params[:title].downcase}%")
    end

    def filter_by_status
      return if params[:status].blank?

      @posts = posts.where(status: params[:status])
    end

    def filter_by_categories
      return if params[:category_ids].blank?

      post_ids = posts.joins(:categories).where(categories: { slug: params[:category_ids] }).pluck(:id)
      @posts = posts.where(id: post_ids)
    end
end
