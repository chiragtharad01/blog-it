import React from "react";

import { Form } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";
import EditForm from "./EditForm";

import { useEditPost, usePost } from "../../hooks/reactQuery/usePostsApi";
import { Container, PageTitle } from "../commons";

const EditPost = () => {
  const { slug } = useParams();
  const { data: { data: { post = {} } = {} } = {} } = usePost(slug);

  const { title, description, categories: category_ids = [], status } = post;
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
      <Form
        formikProps={{
          initialValues: {
            title,
            description,
            category_ids: defaultCategoryOptions,
            status,
          },
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {formikProps => (
          <div className="w-full px-6">
            <PageTitle
              editTaskSlug={slug}
              formikProps={formikProps}
              title="Edit post"
            />
            <EditForm />
          </div>
        )}
      </Form>
    </Container>
  );
};

export default EditPost;
