import * as yup from "yup";

import i18n from "../../common/i18n";

export const POST_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required(i18n.t("validation.post.title")),
  description: yup.string().required(i18n.t("validation.post.description")),
  category_ids: yup
    .array()
    .min(1, i18n.t("validation.post.minCategory"))
    .required(i18n.t("validation.post.category")),
});

export const CATEGORY_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required(i18n.t("validation.category.name")),
});
