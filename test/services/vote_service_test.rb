# frozen_string_literal: true

require "test_helper"
class VoteServiceTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @post = create(:post, user: @user, organization: @organization, upvotes: 0, downvotes: 0)
  end

  def test_creates_an_upvote_when_user_has_not_voted
    VoteService.new(@post, @user).upvote
    assert_equal 1, @post.reload.upvotes
    assert_equal 0, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_equal "upvote", vote.vote_type
  end

  def test_creates_an_downvote_when_user_has_not_voted
    VoteService.new(@post, @user).downvote
    assert_equal 0, @post.reload.upvotes
    assert_equal 1, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_equal "downvote", vote.vote_type
  end

  def test_removes_existing_upvote
    VoteService.new(@post, @user).upvote
    VoteService.new(@post, @user).upvote
    assert_equal 0, @post.reload.upvotes
    assert_equal 0, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_nil vote
  end

  def test_removes_existing_downvote
    VoteService.new(@post, @user).downvote
    VoteService.new(@post, @user).downvote
    assert_equal 0, @post.reload.upvotes
    assert_equal 0, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_nil vote
  end

  def test_switches_downvote_to_upvote
    create(:vote, post: @post, user: @user, vote_type: :downvote)
    @post.update!(upvotes: 0, downvotes: 1)
    VoteService.new(@post, @user).upvote
    assert_equal 1, @post.reload.upvotes
    assert_equal 0, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_equal "upvote", vote.vote_type
  end

  def test_switches_upvote_to_downvote
    create(:vote, post: @post, user: @user, vote_type: :upvote)
    @post.update!(upvotes: 1, downvotes: 0)
    VoteService.new(@post, @user).downvote
    assert_equal 0, @post.reload.upvotes
    assert_equal 1, @post.reload.downvotes

    vote = @post.votes.find_by(user: @user)
    assert_equal "downvote", vote.vote_type
  end
end
