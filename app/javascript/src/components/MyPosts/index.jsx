import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import FilterPane from "./FilterPane";
import PostTable from "./Table";
import TableActions from "./TableActions";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useMyPosts } from "../../hooks/reactQuery/useMyPostsApi";
import { Container, PageLoader, PageTitle } from "../commons";

const PostsCurrentUser = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const { data: { data: { posts = [] } = {} } = {}, isLoading } = useMyPosts();
  const { t } = useTranslation();
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();
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
          categories={categories}
          isPaneOpen={isPaneOpen}
          onClose={() => setIsPaneOpen(false)}
        />
      </div>
    </Container>
  );
};

export default PostsCurrentUser;
