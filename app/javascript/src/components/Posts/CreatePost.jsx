import React from "react";

import PostsForm from "./Form";

import { Container, PageTitle } from "../commons";

const CreatePost = () => (
  <Container>
    <PageTitle title="Create post" />
    <PostsForm />
  </Container>
);
export default CreatePost;
