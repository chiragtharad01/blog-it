# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :slug,
    :updated_at,
    :description,
    :is_bloggable,
    :upvotes,
    :downvotes
  json.current_user_vote post.votes.find_by(user: @current_user)&.vote_type
  json.user do
    json.extract! post.user,
      :id,
      :name
  end
  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name,
      :slug
  end
end
