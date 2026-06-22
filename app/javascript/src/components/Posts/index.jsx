import React, { useState } from "react";

import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import Card from "./Card";
import CategoriesSidebar from "./CategoriesSidebar";
import CreateCategoryModal from "./CreateCategoryModal";

import { usePosts } from "../../hooks/reactQuery/usePostsApi";
import { PageTitle, Container, PageLoader } from "../commons";

const Posts = () => {
  const location = useLocation();
  // const [posts, setPosts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const categoryIds = searchParams.get("category_ids");
  const response = usePosts(categoryIds);
  const { data: { data: { posts = [] } = {} } = {}, isLoading } = response;

  if (isLoading) {
    return (
      <Container>
        <PageTitle title="Blog posts" />
        <PageLoader />
      </Container>
    );
  }

  return (
    <Container setIsSidebarOpen={setIsSidebarOpen}>
      <div className="flex">
        {isSidebarOpen && <CategoriesSidebar setIsModalOpen={setIsModalOpen} />}
        <div className="w-full px-6">
          <PageTitle
            shouldShowButton
            button="Add new blog post"
            redirectTo="/posts/create"
            title="Blog posts"
          />
          {isModalOpen && (
            <CreateCategoryModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          {posts.map(post => (
            <Card key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Posts;
