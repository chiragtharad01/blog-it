import React, { useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Alert, Dropdown } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";

import {
  useDeletePost,
  useUpdatePostStatus,
} from "../../hooks/reactQuery/usePostsApi";

const PostAction = ({ post }) => {
  const { t } = useTranslation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const updateStatus = useUpdatePostStatus();
  const deletePost = useDeletePost();
  const actionStatus = post.status === "draft" ? "publish" : "draft";
  const actionLabel =
    post.status === "draft"
      ? t("post.status.publish")
      : t("post.status.unpublish");

  const handleUpdateStatus = async status => {
    try {
      await updateStatus.mutateAsync({ slug: post.slug, status });
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <>
      <Dropdown
        buttonStyle="secondary"
        icon={MenuHorizontal}
        strategy="fixed"
        buttonProps={{
          className: "display-none bg-white",
        }}
      >
        <Dropdown.Menu>
          <Dropdown.MenuItem.Button
            onClick={() => handleUpdateStatus(actionStatus)}
          >
            {actionLabel}
          </Dropdown.MenuItem.Button>
          <Dropdown.Divider />
          <Dropdown.MenuItem.Button
            style="danger"
            onClick={() => setIsAlertOpen(true)}
          >
            {t("post.status.delete")}
          </Dropdown.MenuItem.Button>
        </Dropdown.Menu>
      </Dropdown>
      <Alert
        isOpen={isAlertOpen}
        message={t("post.delete.message", { title: post.title })}
        title={t("post.delete.title", { title: post.title })}
        onClose={() => setIsAlertOpen(false)}
        onSubmit={() => {
          handleDelete();
          setIsAlertOpen(false);
        }}
      />
    </>
  );
};

export default PostAction;
