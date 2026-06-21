import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import Card from "./Card";
import CategoriesSidebar from "./CategoriesSidebar";
import CreateCategoryModal from "./CreateCategoryModal";

import postsApi from "../../apis/posts";
import { PageTitle, Container, PageLoader } from "../commons";

const Posts = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  // const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const fetchPosts = async categories => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch({ category_ids: categories });
      setPosts(posts);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    fetchPosts(searchParams.get("category_ids"));
  }, [location.search]);
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
