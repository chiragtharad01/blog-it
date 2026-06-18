import React from "react";

import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

import postsApi from "../../apis/posts";

const PostsForm = () => {
  const history = useHistory();
  const handleSubmit = async values => {
    try {
      await postsApi.create(values);
    } catch (error) {
      Logger.error(error);
    } finally {
      history.push("/dashboard");
    }
  };

  return (
    <Form
      formikProps={{
        initialValues: { title: "", description: "" },
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
          <Button className="w-20 bg-black" label="Submit" type="submit" />
        </div>
      </div>
    </Form>
  );
};

export default PostsForm;
