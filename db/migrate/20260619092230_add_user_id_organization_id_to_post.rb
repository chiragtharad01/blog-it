# frozen_string_literal: true

class AddUserIdOrganizationIdToPost < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :user_id, :integer
    add_column :posts, :organization_id, :integer
  end
end
