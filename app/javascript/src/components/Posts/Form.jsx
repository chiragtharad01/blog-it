import React from "react";

import { Form, Input, Button, Select } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import { PageLoader } from "../commons";

const PostsForm = () => {
  const history = useHistory();
  const { data: { data: { categories = [] } = {} } = {}, isLoading } =
    useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));
  const createPost = useCreatePost();

  const handleSubmit = async values => {
    try {
      const payload = {
        ...values,
        category_ids: values.category_ids.map(category => category.value),
      };
      await createPost.mutateAsync(payload);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Form
      formikProps={{
        initialValues: { title: "", description: "", category_ids: [] },
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
            disabled={createPost.isLoading}
            label="Submit"
            loading={createPost.isLoading}
            type="submit"
          />
        </div>
      </div>
    </Form>
  );
};

export default PostsForm;
