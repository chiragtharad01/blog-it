# frozen_string_literal: true

class AddForeignKeyToPost < ActiveRecord::Migration[8.0]
  def change
    add_foreign_key :posts, :users, column: :user_id
    add_foreign_key :posts, :organizations, column: :organization_id
  end
end
