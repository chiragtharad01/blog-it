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

  def test_should_bulk_delete_selected_posts
    post1 = create(:post, user: @user, organization: @organization)
    post2 = create(:post, user: @user, organization: @organization)
    assert_difference("Post.count", -2) do
      delete bulk_delete_my_posts_path, params: {
                                          bulk_params: {
                                            ids: [post1.id, post2.id]
                                          }
                                        },
        headers: @headers,
        as: :json
    end
  end

  def test_should_not_delete_other_users_posts
    other_post = create(
      :post,
      user: @other_user,
      organization: @organization
    )

    assert_no_difference("Post.count") do
      delete bulk_delete_my_posts_path,
        params: {
          bulk_params: {
            ids: [other_post.id]
          }
        },
        headers: @headers,
        as: :json
    end

    assert_response :success
    assert Post.exists?(other_post.id)
  end

  def test_should_bulk_update_post_status
    post1 = create(
      :post,
      user: @user,
      organization: @organization,
      status: :draft
    )

    post2 = create(
      :post,
      user: @user,
      organization: @organization,
      status: :draft
    )

    patch bulk_update_status_my_posts_path,
      params: {
        bulk_params: {
          ids: [post1.id, post2.id],
          status: "publish"
        }
      },
      headers: @headers,
      as: :json

    assert_response :success

    assert_equal "publish", post1.reload.status
    assert_equal "publish", post2.reload.status
  end

  def test_should_not_update_other_users_posts
    other_post = create(
      :post,
      user: @other_user,
      organization: @organization,
      status: :draft
    )

    patch bulk_update_status_my_posts_path,
      params: {
        bulk_params: {
          ids: [other_post.id],
          status: "publish"
        }
      },
      headers: @headers,
      as: :json

    assert_response :success

    assert_equal "draft", other_post.reload.status
  end
end
