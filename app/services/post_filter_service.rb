# frozen_string_literal: true

class PostFilterService
  attr_reader :posts, :params
  def initialize(posts, params)
    @posts = posts
    @params = params
  end

  def process
    filter_by_categories

    posts
  end

  private

    def filter_by_categories
      return if params[:categories].blank?

      category_slugs = params[:categories].split(",")
      post_ids = posts.joins(:categories).where(categories: { slug: category_slugs }).pluck(:id)
      @posts = posts.where(id: post_ids)
    end
end
