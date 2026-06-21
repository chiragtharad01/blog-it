import React from "react";

import { Button, Form, Input } from "@bigbinary/neetoui/formik";

import { SIGNUP_FORM_VALIDATION_SCHEMA } from "../constants";

const SignupForm = ({ handleSubmit }) => (
  <Form
    formikProps={{
      initialValues: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
      onSubmit: handleSubmit,
    }}
  >
    <div className="neeto-ui-rounded flex h-full w-96  flex-col items-start justify-center gap-2 border-2 px-10 py-8">
      <div className="flex w-full flex-col gap-6">
        <Input required label="Name" name="name" placeholder="Enter name" />
        <Input
          required
          label="Email"
          name="email"
          placeholder="Enter email"
          size="large"
          type="email"
        />
        <Input
          required
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
        />
        <Input
          required
          label="Confirm password"
          name="password_confirmation"
          placeholder="Re enter password"
          size="large"
          type="password"
        />
      </div>
      <div className="mt-4 flex w-full justify-end gap-2">
        <Button className="w-20 bg-black" label="Submit" type="submit" />
      </div>
    </div>
  </Form>
);

export default SignupForm;
