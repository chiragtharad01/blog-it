import React, { useState } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { ActionDropdown, Alert, Button, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useDeletePost } from "../../hooks/reactQuery/usePostsApi";

const PageTitle = ({
  title,
  button,
  redirectTo,
  shouldShowButton,
  formikProps,
  editTaskSlug,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const history = useHistory();
  const deletePost = useDeletePost();
  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(editTaskSlug);
      history.push("/dashboard");
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="my-8 flex w-full items-center justify-between">
      <Typography className="w-full text-3xl" style="h2" weight="bold">
        {title}
      </Typography>
      {shouldShowButton && (
        <Button
          className="min-w-max bg-black"
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
              formikProps.values.status === "draft"
                ? "Save as Draft"
                : "Publish"
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
              <ActionDropdown.MenuItem.Button
                onClick={() => {
                  formikProps.setFieldValue("status", "publish");
                }}
              >
                Publish
              </ActionDropdown.MenuItem.Button>
              {editTaskSlug && (
                <>
                  <ActionDropdown.Divider />
                  <ActionDropdown.MenuItem.Button
                    prefix={<Delete size={20} />}
                    style="danger"
                    onClick={() => setIsAlertOpen(true)}
                  >
                    Delete
                  </ActionDropdown.MenuItem.Button>
                </>
              )}
            </ActionDropdown.Menu>
          </ActionDropdown>
          <Alert
            isOpen={isAlertOpen}
            message={`"${formikProps.values.title}" will get permanently deleted. Proceed?`}
            title={`Delete "${formikProps.values.title}?"`}
            onClose={() => setIsAlertOpen(false)}
            onSubmit={() => {
              handleDelete();
              setIsAlertOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PageTitle;
