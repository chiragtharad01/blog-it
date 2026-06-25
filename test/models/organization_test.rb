# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @organization = create(:organization)
  end

  def test_should_create_valid_organization
    assert @organization
  end

  def test_name_should_not_be_blank
    @organization.name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors[:name], "can't be blank"
  end
end
