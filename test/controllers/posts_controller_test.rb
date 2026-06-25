# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)

    @user = create(
      :user,
      organization: @organization
    )

    @post = create(
      :post,
      user: @user,
      organization: @organization
    )

    @category = create(:category)

    @headers = {
      "X-Auth-Email" => @user.email,
      "X-Auth-Token" => @user.authentication_token,
      "Accept" => "application/json"
    }
    @other_user = create(
      :user,
      organization: @organization
)

    @other_headers = {
      "X-Auth-Email" => @other_user.email,
      "X-Auth-Token" => @other_user.authentication_token,
      "Accept" => "application/json"
    }
  end

  def test_should_list_posts
    get posts_path(format: :json), headers: @headers

    assert_response :success
  end

  def test_should_show_post
    get post_path(@post.slug, format: :json), headers: @headers

    assert_response :success
  end

  def test_should_create_post
    assert_difference("Post.count", 1) do
      post posts_path(format: :json),
        headers: @headers,
        params: {
          post: {
            title: "Random Post",
            description: "Random Description",
            category_ids: [@category.id]
          }
        }
    end

    assert_response :success
  end

  def test_should_assign_current_user_to_post
    post posts_path(format: :json),
      headers: @headers,
      params: {
        post: {
          title: "New Post",
          description: "Description"
        }
      }

    created_post = Post.last

    assert_equal @user.id, created_post.user_id
  end

  def test_should_not_update_post_with_invalid_params
    patch post_path(@post.slug, format: :json),
      headers: @headers,
      params: {
        post: {
          title: ""
        }
      }

    assert_response :unprocessable_entity
  end

  def test_should_not_create_post_with_invalid_params
    assert_no_difference("Post.count") do
      post posts_path(format: :json),
        headers: @headers,
        params: {
          post: {
            title: "",
            description: ""
          }
        }
    end

    assert_response :unprocessable_entity
  end

  def test_should_not_update_other_users_post
    patch post_path(@post.slug, format: :json),
      headers: @other_headers,
      params: {
        post: {
          title: "Hacked"
        }
      }

    assert_response :forbidden
  end

  def test_should_not_destroy_other_users_post
    assert_no_difference("Post.count") do
      delete post_path(@post.slug, format: :json),
        headers: @other_headers
    end

    assert_response :forbidden
  end

  def test_should_not_show_other_users_draft_post
    draft_post = create(
      :post,
      status: :draft,
      user: @user,
      organization: @organization
    )

    get post_path(draft_post.slug, format: :json),
      headers: @other_headers

    assert_response :forbidden
  end

  def test_should_show_published_post_to_other_user
    published_post = create(
      :post,
      status: :publish,
      user: @user,
      organization: @organization
    )

    get post_path(published_post.slug, format: :json),
      headers: @other_headers

    assert_response :success
  end

  def test_should_show_record_not_found
    get post_path("non-existent-slug", format: :json),
      headers: @headers

    assert_response :not_found
  end

  def test_should_update_post
    patch post_path(@post.slug, format: :json),
      headers: @headers,
      params: {
        post: {
          title: "Updated Title"
        }
      }

    @post.reload

    assert_equal "Updated Title", @post.title
    assert_response :success
  end

  def test_should_destroy_post
    assert_difference("Post.count", -1) do
      delete post_path(@post.slug, format: :json),
        headers: @headers
    end

    assert_response :success
  end
end
