# frozen_string_literal: true

require "test_helper"

class MyPostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)

    @user = create(
      :user,
      organization: @organization
    )

    @other_user = create(
      :user,
      organization: @organization
    )

    @post = create(
      :post,
      user: @user,
      organization: @organization
    )

    create(
      :post,
      user: @other_user,
      organization: @organization
    )

    @headers = {
      "X-Auth-Email" => @user.email,
      "X-Auth-Token" => @user.authentication_token,
      "Accept" => "application/json"
    }
  end

  def test_should_list_my_posts
    get my_posts_path(format: :json), headers: @headers

    assert_response :success
  end

  def test_should_return_unauthorized_without_authentication
    get my_posts_path(format: :json)

    assert_response :unauthorized
  end
end
