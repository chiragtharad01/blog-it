import React from "react";

import { ActionDropdown, Button, Typography } from "@bigbinary/neetoui";

const PageTitle = ({
  title,
  button,
  redirectTo,
  shouldShowButton,
  formikProps,
}) => (
  <div className="my-8 flex w-full items-center justify-between">
    <Typography className="text-3xl" style="h2" weight="bold">
      {title}
    </Typography>
    {shouldShowButton && (
      <Button
        className="bg-black"
        label={button}
        style="primary"
        to={redirectTo}
      />
    )}
    {formikProps && (
      <div className="flex h-min w-full justify-end gap-2">
        <Button
          className="w-20"
          label="Cancel"
          style="tertiary"
          to="/dashboard"
          type="cancel"
        />
        <ActionDropdown
          buttonStyle="primary"
          buttonProps={{
            className: "neetix-button--primary min-w-min",
          }}
          dropdownProps={{
            buttonProps: {
              className: "neetix-button--primary",
            },
          }}
          label={
            formikProps.values.status === "draft" ? "Save as Draft" : "Publish"
          }
          onClick={() => {
            formikProps.submitForm();
          }}
        >
          <ActionDropdown.Menu>
            <ActionDropdown.MenuItem.Button
              onClick={() => {
                formikProps.setFieldValue("status", "draft");
              }}
            >
              Save as draft
            </ActionDropdown.MenuItem.Button>
            <ActionDropdown.Divider />
            <ActionDropdown.MenuItem.Button
              onClick={() => {
                formikProps.setFieldValue("status", "publish");
              }}
            >
              Publish
            </ActionDropdown.MenuItem.Button>
          </ActionDropdown.Menu>
        </ActionDropdown>
      </div>
    )}
  </div>
);

export default PageTitle;
