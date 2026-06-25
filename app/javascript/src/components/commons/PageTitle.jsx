import React, { useState } from "react";

import { Delete, UpArrow } from "@bigbinary/neeto-icons";
import { ActionDropdown, Alert, Button, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useDeletePost } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";

const PageTitle = ({
  title,
  button,
  redirectTo,
  shouldShowButton,
  shouldShowPreviewButton,
  formikProps,
  editPostSlug,
}) => {
  const { t } = useTranslation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const history = useHistory();
  const deletePost = useDeletePost();
  const actionDropdownLabel =
    formikProps?.values.status === "draft"
      ? t("post.status.saveAsDraft")
      : t("post.status.publish");

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(editPostSlug);
      history.push(routes.dashboard);
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
          {shouldShowPreviewButton && (
            <Button
              className="rotate-45 text-black"
              icon={UpArrow}
              iconSize={16}
              style="link"
              to={routes.posts.show(editPostSlug)}
            />
          )}
          <Button
            className="w-20"
            label={t("post.status.cancel")}
            style="tertiary"
            to={routes.dashboard}
            type="cancel"
          />
          <ActionDropdown
            buttonStyle="primary"
            label={actionDropdownLabel}
            buttonProps={{
              className: "neetix-button--primary min-w-min",
            }}
            dropdownProps={{
              buttonProps: {
                className: "neetix-button--primary",
              },
            }}
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
                {t("post.status.saveAsDraft")}
              </ActionDropdown.MenuItem.Button>
              <ActionDropdown.MenuItem.Button
                onClick={() => {
                  formikProps.setFieldValue("status", "publish");
                }}
              >
                {t("post.status.publish")}
              </ActionDropdown.MenuItem.Button>
              {editPostSlug && (
                <>
                  <ActionDropdown.Divider />
                  <ActionDropdown.MenuItem.Button
                    prefix={<Delete size={20} />}
                    style="danger"
                    onClick={() => setIsAlertOpen(true)}
                  >
                    {t("post.status.delete")}
                  </ActionDropdown.MenuItem.Button>
                </>
              )}
            </ActionDropdown.Menu>
          </ActionDropdown>
          <Alert
            isOpen={isAlertOpen}
            message={t("post.delete.message", {
              title: formikProps.values.title,
            })}
            title={t("post.delete.title", {
              title: formikProps.values.title,
            })}
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
