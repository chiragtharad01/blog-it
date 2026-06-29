# frozen_string_literal: true

class ReportsJob
  include Sidekiq::Job

  def perform(post_id, report_path, requester_id)
    post = Post.find(post_id)
    user_id = post.user_id

    ActionCable.server.broadcast(
      "report_download_#{requester_id}",
      {
        message: I18n.t("report.render"),
        progress: 25
      }
    )
    html = ApplicationController.render(
      assigns: { post: },
      template: "posts/report/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(
      "report_download_#{requester_id}",
      {
        message: I18n.t("report.generate"),
        progress: 50
      }
    )

    pdf = WickedPdf.new.pdf_from_string(html)

    ActionCable.server.broadcast(
      "report_download_#{requester_id}",
      {
        message: I18n.t("report.saving"),
        progress: 75
      }
    )

    File.binwrite(report_path, pdf)
    ActionCable.server.broadcast(
      "report_download_#{requester_id}",
      {
        message: I18n.t("report.ready"),
        progress: 100
      }
    )
  end
end
