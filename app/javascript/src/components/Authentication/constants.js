import * as yup from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .max(125, "Name cannot exceed 125 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),

  password_confirmation: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export const LOGIN_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please enter a valid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
