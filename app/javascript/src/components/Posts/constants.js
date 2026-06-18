import * as yup from "yup";

export const POST_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});
