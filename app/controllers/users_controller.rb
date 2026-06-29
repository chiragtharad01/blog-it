# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def index
    @users = User.select(:id, :name)
  end

  def show
    # user = User.find_by!(params[:id]).select(:id, :name)
    @user = User.select(:id, :name).find(params[:id])
    render status: :ok, json: { user: @user }
  end

  def create
    user = User.new(user_params)
    user.organization_id = 1
    user.save!
    render_notice(t("successfully_created", entity: "User"))
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
