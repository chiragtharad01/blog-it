import React, { useEffect, useState } from "react";

import { Avatar, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import postsApi from "../../apis/posts";
import { Container, PageLoader } from "../commons";
import formatDate from "../utils";

const ShowPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const loadPostDetails = async () => {
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

    loadPostDetails();
  }, [slug]);

  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-16 px-6">
        <div className="flex gap-2">
          {post.categories?.map(category => (
            <Typography
              className="neeto-ui-rounded-full min-w-min bg-green-100 px-3 py-1"
              key={category.id}
              style="nano"
            >
              {category.name}
            </Typography>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <Typography className="text-3xl" style="h2" weight="bold">
            {post.title}
          </Typography>
          <div className="flex gap-4">
            <Avatar
              user={{
                name: "neeto UI",
              }}
            />
            <div>
              <Typography style="h6">{post.user.name}</Typography>
              <Typography style="body3">
                {formatDate(post.created_at)}
              </Typography>
            </div>
          </div>
          <Typography style="body1">{post.description}</Typography>
        </div>
      </div>
    </Container>
  );
};

export default ShowPost;
