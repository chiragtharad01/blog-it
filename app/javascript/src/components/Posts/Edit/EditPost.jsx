import React from "react";

import { Toastr } from "@bigbinary/neetoui";
import { Form } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import EditForm from "./EditForm";

import { useEditPost, usePost } from "../../../hooks/reactQuery/usePostsApi";
import routes from "../../../routes";
import useAuthStore from "../../../stores/authStore";
import { Container, PageLoader, PageTitle } from "../../commons";
import { POST_FORM_VALIDATION_SCHEMA } from "../constants";

const EditPost = () => {
  const history = useHistory();
  const currentUser = useAuthStore(store => store.authUserId);
  const { t } = useTranslation();
  const { slug } = useParams();
  const { data: { data: { post = {} } = {} } = {}, isLoading } = usePost(slug);
  if (!isLoading && post?.user?.id !== currentUser) {
    Toastr.error(t("userNotAuthenticatedError"), { autoClose: 2000 });
    history.push(routes.posts.show(slug));
  }

  const {
    title = "",
    description = "",
    categories: category_ids = [],
    status = "",
  } = post;

  const defaultCategoryOptions = category_ids.map(category => ({
    value: category.id,
    label: category.name,
  }));
  const updatePost = useEditPost();
  const handleSubmit = async values => {
    try {
      const payload = {
        ...values,
        category_ids: values.category_ids.map(category => category.value),
      };
      await updatePost.mutateAsync({ slug, payload });
      history.push(routes.posts.show(slug));
    } catch (error) {
      Logger.error(error);
    }
  };
  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

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
              shouldShowPreviewButton
              editPostSlug={slug}
              formikProps={formikProps}
              title={t("post.create.editTitle")}
            />
            <EditForm />
          </div>
        )}
      </Form>
    </Container>
  );
};

export default EditPost;
