# frozen_string_literal: true

module Sluggable
  extend ActiveSupport::Concern

  private

    def generate_slug(source_attribute)
      base_slug = send(source_attribute).parameterize

      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"

      latest_slug = self.class.where(
        regex_pattern,
        "^#{base_slug}$|^#{base_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug

      slug_count = 0

      if latest_slug.present?
        slug_count = latest_slug.split("-").last.to_i
        slug_count = 1 if slug_count.zero?
      end

      self.slug =
        if slug_count.positive?
          "#{base_slug}-#{slug_count + 1}"
        else
          base_slug
        end
    end
end
