import React from "react";

import { NoData } from "@bigbinary/neetoui";
import { isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";

import Card from "./Card";

const PostContainer = ({ posts }) => {
  const { t } = useTranslation();
  if (isEmpty(posts) || isNil(posts)) {
    return <NoData title={t("post.noPostsTitle")} />;
  }

  return (
    <>
      {posts.map(post => (
        <Card key={post.slug} {...post} />
      ))}
    </>
  );
};

export default PostContainer;
