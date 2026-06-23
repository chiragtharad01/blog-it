import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { usePost } from "../../hooks/reactQuery/usePostsApi";
import { Container, PageLoader } from "../commons";
import formatDate from "../utils";

const ShowPost = () => {
  const { slug } = useParams();
  const { data: { data: { post = {} } = {} } = {}, isLoading } = usePost(slug);

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
          <div className="flex justify-between">
            <Typography className="text-3xl" style="h2" weight="bold">
              {post.title}
            </Typography>
            <Button
              className="text-black"
              icon={Edit}
              style="link"
              to={`/posts/${slug}/edit`}
            />
          </div>
          <div className="flex gap-4">
            <Avatar
              user={{
                name: "neeto UI",
              }}
            />
            <div>
              <Typography style="h6">{post.user.name}</Typography>
              <Typography style="body3">
                {formatDate(post.updated_at)}
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
