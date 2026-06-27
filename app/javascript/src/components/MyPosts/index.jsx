import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import BulkActions from "./BulkActions";
import FilterPane from "./FilterPane";
import PostTable from "./Table";
import TableActions from "./TableActions";

import { useMyPosts } from "../../hooks/reactQuery/useMyPostsApi";
import useBulkPostStore from "../../stores/useBulkPostStore";
import useFilterStore from "../../stores/useFilterStore";
import { Container, PageLoader, PageTitle } from "../commons";

const PostsCurrentUser = () => {
  const selectedRowKeys = useBulkPostStore(store => store.selectedRowKeys);
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const filters = useFilterStore(store => store.filters);
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
        {selectedRowKeys.length > 0 ? (
          <BulkActions
            selectedRowKeys={selectedRowKeys}
            totalPosts={posts.length}
          />
        ) : (
          <TableActions setIsPaneOpen={setIsPaneOpen} />
        )}
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
