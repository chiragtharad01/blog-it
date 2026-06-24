import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import CategoriesSidebar from "./CategoriesSidebar";
import CreateCategoryModal from "./CreateCategoryModal";
import PostContainer from "./PostContainer";

import { usePosts } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import { PageTitle, Container, PageLoader } from "../commons";

const Posts = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const categories = searchParams.get("categories");
  const response = usePosts(categories);
  const { data: { data: { posts = [] } = {} } = {}, isLoading } = response;

  if (isLoading) {
    return (
      <Container>
        <div className="w-full px-6">
          <PageTitle title={t("post.homeTitle")} />
          <PageLoader />
        </div>
      </Container>
    );
  }

  return (
    <Container
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    >
      <div className="flex">
        {isSidebarOpen && <CategoriesSidebar setIsModalOpen={setIsModalOpen} />}
        <div className="w-full px-6">
          <PageTitle
            shouldShowButton
            button={t("post.homeButton")}
            redirectTo={routes.posts.create}
            title={t("post.homeTitle")}
          />
          {isModalOpen && (
            <CreateCategoryModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <div className="flex w-full flex-col gap-3">
            <PostContainer posts={posts} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Posts;
