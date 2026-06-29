# frozen_string_literal: true

class ReportDownloadChannel < ApplicationCable::Channel
  def subscribed
    stream_from "report_download_#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end
end
