import React from "react";

import { Button, Form, Input, Select } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useEditPost, usePost } from "../../hooks/reactQuery/usePostsApi";
import { Container, PageTitle } from "../commons";

const EditTask = () => {
  const { slug } = useParams();
  const { data: { data: { post = {} } = {} } = {} } = usePost(slug);
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));
  const { title, description, categories: category_ids = [] } = post;
  const defaultCategoryOptions = category_ids.map(category => ({
    value: category.id,
    label: category.name,
  }));
  const history = useHistory();
  const updatePost = useEditPost();
  const handleSubmit = async values => {
    try {
      const payload = {
        ...values,
        category_ids: values.category_ids.map(category => category.value),
      };
      await updatePost.mutateAsync({ slug, payload });
      history.push(`/posts/${slug}/show`);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <Container>
      <div className="w-full px-6">
        <PageTitle title="Edit post" />
        <Form
          formikProps={{
            initialValues: {
              title,
              description,
              category_ids: defaultCategoryOptions,
            },
            validationSchema: POST_FORM_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="neeto-ui-rounded flex h-96 w-full  flex-col items-start justify-between gap-2 border-2 px-10 py-8">
            <div className="flex w-full flex-col gap-6">
              <Input
                required
                label="Title"
                name="title"
                placeholder="Enter title"
              />
              <Select
                isMulti
                isSearchable
                required
                label="Category"
                name="category_ids"
                options={categoryOptions}
                placeholder="Search category"
              />
              <Input
                required
                label="Description"
                name="description"
                placeholder="Enter description"
                size="large"
              />
            </div>
            <div className="flex w-full justify-end gap-2">
              <Button
                className="w-20"
                label="Cancel"
                style="tertiary"
                type="cancel"
              />
              <Button
                className="w-20 bg-black"
                disabled={updatePost.isLoading}
                label="Submit"
                loading={updatePost.isLoading}
                type="submit"
              />
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EditTask;
