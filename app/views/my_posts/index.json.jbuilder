# frozen_string_literal: true

json.posts @posts do |post|
  json.extract! post,
    :id,
    :title,
    :description,
    :updated_at,
    :slug,
    :status
  json.categories post.categories do |category|
    json.extract! category,
      :id,
      :name
  end
end
