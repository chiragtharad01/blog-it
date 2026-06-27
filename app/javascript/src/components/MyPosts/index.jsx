import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import FilterPane from "./FilterPane";
import PostTable from "./Table";
import TableActions from "./TableActions";

import { useMyPosts } from "../../hooks/reactQuery/useMyPostsApi";
import useFilterStore from "../../stores/useFilterStore";
import { Container, PageLoader, PageTitle } from "../commons";

const PostsCurrentUser = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const filters = useFilterStore(store => store.filters);
  // console.log(filters);
  const { data: { data: { posts = [] } = {} } = {}, isLoading } =
    useMyPosts(filters);
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Container>
        <div className="w-full px-6">
          <PageTitle title={t("post.secondTitle")} />
          <PageLoader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full px-6">
        <PageTitle title={t("post.secondTitle")} />
        <TableActions setIsPaneOpen={setIsPaneOpen} />
        <PostTable posts={posts} />
        <FilterPane
          isPaneOpen={isPaneOpen}
          onClose={() => setIsPaneOpen(false)}
        />
      </div>
    </Container>
  );
};

export default PostsCurrentUser;
