# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)

    @user = create(
      :user,
      organization: @organization
    )

    @headers = {
      "X-Auth-Email" => @user.email,
      "X-Auth-Token" => @user.authentication_token,
      "Accept" => "application/json"
    }

    @category = create(:category, name: "Technology")
  end

  def test_should_list_categories
    get categories_path(format: :json), headers: @headers

    assert_response :success
  end

  def test_should_filter_categories_by_search
    create(:category, name: "Sports")

    get categories_path(format: :json),
      headers: @headers,
      params: {
        search: "tech"
      }

    assert_response :success
  end

  def test_should_create_category
    assert_difference("Category.count", 1) do
      post categories_path(format: :json),
        headers: @headers,
        params: {
          category: {
            name: "Programming"
          }
        }
    end

    assert_response :success
  end

  def test_should_not_create_category_with_invalid_params
    post categories_path(format: :json),
      headers: @headers,
      params: {
        category: {
          name: ""
        }
      }

    assert_response :unprocessable_entity
  end

  def test_should_not_create_duplicate_category
    post categories_path(format: :json),
      headers: @headers,
      params: {
        category: {
          name: @category.name
        }
      }

    assert_response :unprocessable_entity
  end
end
