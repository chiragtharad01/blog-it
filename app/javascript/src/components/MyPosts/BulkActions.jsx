import React, { useState } from "react";

import { Delete } from "@bigbinary/neeto-icons";
import { Alert, Button, Dropdown, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { Trans, useTranslation } from "react-i18next";

import {
  useBulkDeleteMyPosts,
  useBulkUpdateMyPosts,
} from "../../hooks/reactQuery/useMyPostsApi";
import useBulkPostStore from "../../stores/useBulkPostStore";

const BulkActions = ({ totalPosts, selectedRowKeys }) => {
  const setSelectedRowKeys = useBulkPostStore(
    store => store.setSelectedRowKeys
  );
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { t } = useTranslation();
  const bulkDeleteRows = useBulkDeleteMyPosts();
  const bulkUpdateRows = useBulkUpdateMyPosts();
  const handleUpdate = async status => {
    try {
      await bulkUpdateRows.mutateAsync({ ids: selectedRowKeys, status });
    } catch (error) {
      Logger.error(error);
    } finally {
      setSelectedRowKeys([]);
    }
  };

  const handleDelete = async () => {
    try {
      await bulkDeleteRows.mutateAsync({ ids: selectedRowKeys });
    } catch (error) {
      Logger.error(error);
    } finally {
      setSelectedRowKeys([]);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-4">
      <Typography>
        <Trans
          components={{ 1: <span className="font-semibold" /> }}
          i18nKey="mypost.count"
          values={{
            count: selectedRowKeys.length,
            totalCount: totalPosts,
          }}
        />
      </Typography>
      <div className="flex items-center gap-2">
        <Dropdown buttonStyle="secondary" label={t("mypost.dropDown.label")}>
          <Dropdown.Menu className="flex flex-col gap-2 p-2">
            <Dropdown.MenuItem.Button onClick={() => handleUpdate("draft")}>
              {t("mypost.dropDown.draft")}
            </Dropdown.MenuItem.Button>
            <Dropdown.MenuItem.Button onClick={() => handleUpdate("publish")}>
              {t("mypost.dropDown.publish")}
            </Dropdown.MenuItem.Button>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          icon={Delete}
          iconPosition="right"
          iconSize={16}
          label={t("post.status.delete")}
          style="danger-text"
          onClick={() => setIsDeleteAlertOpen(true)}
        />
        <Alert
          isOpen={isDeleteAlertOpen}
          title={t("mypost.delete.title", { count: selectedRowKeys.length })}
          message={
            <Trans
              components={{ 1: <span className="font-semibold" /> }}
              i18nKey="mypost.delete.message"
              values={{
                count: selectedRowKeys.length,
              }}
            />
          }
          onClose={() => setIsDeleteAlertOpen(false)}
          onSubmit={() => {
            handleDelete();
            setIsDeleteAlertOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default BulkActions;
