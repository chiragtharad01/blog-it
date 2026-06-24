import React from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { usePost } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import { Container, PageLoader } from "../commons";
import { formatDate } from "../utils";

const ShowPost = () => {
  const { slug } = useParams();
  // const history = useHistory();
  const { data: { data: { post = {} } = {} } = {}, isLoading } = usePost(slug);
  const showTag = post.status === "draft";
  // if (isError) {
  //   console.log("here");
  //   history.push(routes.dashboard);
  // }

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
              key={category.slug}
              style="nano"
            >
              {category.name}
            </Typography>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Typography className="text-3xl" style="h2" weight="bold">
                {post.title}
              </Typography>
              {showTag && (
                <Typography
                  className="neeto-ui-rounded-full h-min min-w-min border border-red-500 px-3 py-0 text-red-500"
                  style="nano"
                >
                  {post.status}
                </Typography>
              )}
            </div>
            <Button
              className="text-black"
              icon={Edit}
              style="link"
              to={routes.posts.edit(slug)}
            />
          </div>
          <div className="flex gap-4">
            <Avatar
              user={{
                name: post.user.name,
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
