# frozen_string_literal: true

class VoteService
  attr_reader :post, :current_user
  def initialize(post, current_user)
    @post = post
    @current_user = current_user
  end

  def upvote
    vote = find_vote
    if vote.nil?
      create_upvote
    elsif vote.upvote?
      remove_upvote(vote)
    else
      switch_to_upvote(vote)
    end
  end

  def downvote
    vote = find_vote
    if vote.nil?
      create_downvote
    elsif vote.upvote?
      switch_to_downvote(vote)
    else
      remove_downvote(vote)
    end
  end

  private

    def find_vote
      post.votes.find_by(user: current_user)
    end

    def create_upvote
      Vote.transaction do
        post.votes.create!(user: current_user, vote_type: :upvote)
        post.increment!(:upvotes)
      end
    end

    def create_downvote
      Vote.transaction do
        post.votes.create!(user: current_user, vote_type: :downvote)
        post.increment!(:downvotes)
      end
    end

    def remove_upvote(vote)
      Vote.transaction do
        vote.destroy!
        post.decrement!(:upvotes)
      end
    end

    def remove_downvote(vote)
      Vote.transaction do
        vote.destroy!
        post.decrement!(:downvotes)
      end
    end

    def switch_to_upvote(vote)
      Vote.transaction do
        vote.update!(vote_type: :upvote)
        post.increment!(:upvotes)
        post.decrement!(:downvotes)
      end
    end

    def switch_to_downvote(vote)
      Vote.transaction do
        vote.update!(vote_type: :downvote)
        post.increment!(:downvotes)
        post.decrement!(:upvotes)
      end
    end
end
