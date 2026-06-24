import * as yup from "yup";

import i18n from "../../common/i18n";

export const POST_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(i18n.t("validation.post.title")),
  description: yup.string().required(i18n.t("validation.post.description")),
});

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(i18n.t("validation.category.name")),
});
