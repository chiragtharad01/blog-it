# frozen_string_literal: true

class Posts::ReportsController < ApplicationController
  def create
    post = Post.find_by!(slug: params[:post_slug])

    ReportsJob.perform_async(post.id, report_path(post), current_user.id)

    head :accepted
  end

  def download
    post = Post.find_by!(slug: params[:post_slug])
    if File.exist?(report_path(post))
      send_file(
        report_path(post),
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "report"), :not_found)
    end
  end

  private

    def report_path(post)
      Rails.root.join(
        "tmp/post-#{post.id}-report.pdf"
      ).to_s
    end

    def pdf_file_name
      "blog_post_report.pdf"
    end
end
