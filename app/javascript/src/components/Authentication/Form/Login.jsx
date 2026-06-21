import React from "react";

import { Button, Form, Input } from "@bigbinary/neetoui/formik";

import { LOGIN_FORM_VALIDATION_SCHEMA } from "../constants";

const LoginForm = ({ handleSubmit }) => (
  <Form
    formikProps={{
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
      onSubmit: handleSubmit,
    }}
  >
    <div className="neeto-ui-rounded flex h-full w-96  flex-col items-start justify-center gap-2 border-2 px-10 py-8">
      <div className="flex w-full flex-col gap-6">
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
      </div>
      <div className="mt-4 flex w-full justify-end gap-2">
        <Button className="w-20 bg-black" label="Submit" type="submit" />
      </div>
    </div>
  </Form>
);

export default LoginForm;
