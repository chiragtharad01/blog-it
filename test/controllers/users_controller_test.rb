# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)

    @user = create(
      :user,
      organization: @organization
    )

    @headers = headers(@user).merge(
      "Accept" => "application/json"
    )
  end

  def test_should_list_all_users
    get users_path(format: :json), headers: @headers

    assert_response :success

    response_json = response.parsed_body

    expected_user_ids = User.pluck(:id).sort
    actual_user_ids = response_json["users"].pluck("id").sort

    assert_equal expected_user_ids, actual_user_ids
  end

  def test_should_signup_user_with_valid_credentials
    assert_difference("User.count", 1) do
      post users_path(format: :json),
        params: {
          user: {
            name: "Sam Smith",
            email: "sam@example.com",
            password: "welcome",
            password_confirmation: "welcome"
          }
        }
    end

    assert_response :success

    response_json = response.parsed_body

    assert_equal(
      I18n.t("successfully_created", entity: "User"),
      response_json["notice"]
    )
  end

  def test_shouldnt_signup_user_with_invalid_credentials
    assert_no_difference("User.count") do
      post users_path(format: :json),
        params: {
          user: {
            name: "Sam Smith",
            email: "sam@example.com",
            password: "welcome",
            password_confirmation: "not matching confirmation"
          }
        }
    end

    assert_response :unprocessable_entity

    assert_equal(
      "Password confirmation doesn't match Password",
      response.parsed_body["error"]
    )
  end

  def test_should_not_signup_user_with_duplicate_email
    assert_no_difference("User.count") do
      post users_path(format: :json),
        params: {
          user: {
            name: "Another User",
            email: @user.email,
            password: "welcome",
            password_confirmation: "welcome"
          }
        }
    end

    assert_response :unprocessable_entity
  end

  def test_should_show_user
    get user_path(@user.id, format: :json), headers: @headers
    assert_response :success
    response_json = response.parsed_body["user"]

    assert_equal @user.id, response_json["id"]
    assert_equal @user.name, response_json["name"]
    assert_nil response_json["email"]
  end
end
