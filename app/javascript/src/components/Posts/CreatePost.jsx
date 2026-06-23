import React from "react";

import { Form } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";
import CreateForm from "./CreateForm";

import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import { Container, PageTitle } from "../commons";

const CreatePost = () => {
  const createPost = useCreatePost();
  const history = useHistory();
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

  return (
    <Container>
      <Form
        formikProps={{
          initialValues: {
            title: "",
            description: "",
            category_ids: [],
            status: "draft",
          },
          validationSchema: POST_FORM_VALIDATION_SCHEMA,
          onSubmit: handleSubmit,
        }}
      >
        {formikProps => (
          <div className="w-full px-6">
            <PageTitle formikProps={formikProps} title="Create post" />
            <CreateForm />
          </div>
        )}
      </Form>
    </Container>
  );
};
export default CreatePost;
