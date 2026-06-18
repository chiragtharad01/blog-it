import React, { useEffect, useState } from "react";

import Logger from "js-logger";

import Card from "./Card";

import postsApi from "../../apis/posts";
import { PageTitle, Container, PageLoader } from "../commons";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <Container>
        <PageTitle title="Blog posts" />
        <PageLoader />
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle
        shouldShowButton
        button="Add new blog post"
        redirectTo="/posts/create"
        title="Blog posts"
      />
      {posts.map(post => (
        <Card key={post.slug} {...post} />
      ))}
    </Container>
  );
};

export default Posts;
