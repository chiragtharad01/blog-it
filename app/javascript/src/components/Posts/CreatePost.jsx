import React from "react";

import PostsForm from "./Form";

import { Container, PageTitle } from "../commons";

const CreatePost = () => (
  <Container>
    <div className="w-full px-6">
      <PageTitle title="Create post" />
      <PostsForm />
    </div>
  </Container>
);
export default CreatePost;
