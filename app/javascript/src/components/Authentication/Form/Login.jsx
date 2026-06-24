import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Button, Form, Input } from "@bigbinary/neetoui/formik";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import withT from "../../../utils/withT";
import { LOGIN_FORM_VALIDATION_SCHEMA } from "../constants";

const LoginForm = ({ handleSubmit, t }) => (
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
      <div className="mb-2 flex w-full flex-col items-center gap-1">
        <Typography className="text-3xl" style="h4" weight="bold">
          {t("loginTitle")}
        </Typography>
        <NavLink to="/signup">
          <Typography className="w-full text-blue-400" style="body2">
            {t("noAccount")}
          </Typography>
        </NavLink>
      </div>
      <div className="flex w-full flex-col gap-6">
        <Input
          required
          label={t("form.email")}
          name="email"
          placeholder={t("form.emailPlaceholder")}
          size="large"
          type="email"
        />
        <Input
          required
          label={t("form.password")}
          name="password"
          placeholder={t("form.passwordPlaceholder")}
          type="password"
        />
      </div>
      <div className="mt-4 flex w-full justify-end gap-2">
        <Button className="w-20 bg-black" label={t("submit")} type="submit" />
      </div>
    </div>
  </Form>
);

export default withT(LoginForm);
