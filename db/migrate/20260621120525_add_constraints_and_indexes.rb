# frozen_string_literal: true

class AddConstraintsAndIndexes < ActiveRecord::Migration[8.0]
  def change
    change_column_null :posts, :user_id, false
    change_column_null :posts, :organization_id, false
    add_index :users, :email, unique: true
    add_index :users, :authentication_token, unique: true
    add_index :categories, :name, unique: true
    add_index :organizations, :name, unique: true
  end
end
