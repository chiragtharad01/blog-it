# frozen_string_literal: true

class AddSlugToCategories < ActiveRecord::Migration[8.0]
  def change
    add_column :categories, :slug, :string, null: false
    add_index :categories, :slug, unique: true
  end
end
