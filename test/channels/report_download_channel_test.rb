# frozen_string_literal: true

require "test_helper"

class ReportDownloadChannelTest < ActionCable::Channel::TestCase
  def setup
    @user = create(:user)
    stub_connection current_user: @user
  end

  def test_subscribed
    subscribe
    assert subscription.confirmed?
    assert_has_stream "report_download_#{@user.id}"
  end

  def test_unsubscribed
    subscribe
    unsubscribe
    assert_no_streams
  end
end
