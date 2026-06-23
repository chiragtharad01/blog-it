# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :slug,
    :created_at,
    :status
  json.user do
    json.extract! post.user,
      :id,
      :email,
      :name
  end
  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
