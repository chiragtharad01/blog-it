import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import postsApi from "../../apis/posts";
import { Container, PageLoader, PageTitle } from "../commons";

const ShowPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const fetchPostDetails = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (err) {
      Logger.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, []);

  if (isLoading) {
    return (
      <Container>
        {/* <PageTitle title="Blog posts" /> */}
        <PageLoader />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-16">
        <PageTitle title={post.title} />
        <Typography style="body1">{post.description}</Typography>
      </div>
    </Container>
  );
};

export default ShowPost;
