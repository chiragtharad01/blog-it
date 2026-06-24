# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :slug,
    :updated_at,
    :description
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
