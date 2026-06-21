import React, { useEffect, useState } from "react";

import { Form, Input, Button, Select } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { POST_FORM_VALIDATION_SCHEMA } from "./constants";

import categoriesApi from "../../apis/categories";
import postsApi from "../../apis/posts";
import { PageLoader } from "../commons";

const PostsForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.fetch();

      const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name,
      }));
      setCategories(categoryOptions);
    } catch (err) {
      Logger.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async values => {
    try {
      const payload = {
        ...values,
        category_ids: values.category_ids.map(category => category.value),
      };
      await postsApi.create(payload);
    } catch (error) {
      Logger.error(error);
    } finally {
      history.push("/dashboard");
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

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
          <Select
            isMulti
            isSearchable
            required
            label="Category"
            name="category_ids"
            options={categories}
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
          <Button className="w-20 bg-black" label="Submit" type="submit" />
        </div>
      </div>
    </Form>
  );
};

export default PostsForm;
