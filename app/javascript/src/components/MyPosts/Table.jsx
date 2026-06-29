import React from "react";

import { Tooltip, Typography, Table } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import PostAction from "./PostAction";

import routes from "../../routes";
import useBulkPostStore from "../../stores/useBulkPostStore";
import usePostTableStore from "../../stores/usePostTableStore";
import { formateDateTime } from "../utils";

const PostTable = ({ posts }) => {
  const { t } = useTranslation();
  const { selectedRowKeys, setSelectedRowKeys } = useBulkPostStore();
  const visibleColumns = usePostTableStore(state => state.visibleColumns);
  const columnData = [
    {
      dataIndex: "title",
      fixed: true,
      isHidable: false,

      render: (_, record) => (
        <Tooltip content={record.title} position="right">
          <div className="xs:w-36  flex items-center  sm:w-64 md:w-80 lg:w-96">
            <NavLink to={routes.posts.edit(record.slug)}>
              <Typography
                className="overflow-hidden truncate text-ellipsis text-green-600 "
                style="body2"
              >
                {record.title}
              </Typography>
            </NavLink>
          </div>
        </Tooltip>
      ),
      key: "title",
      title: t("post.table.title.title"),
    },
    {
      dataIndex: "category",
      fixed: false,
      isHidable: true,
      hidden: !visibleColumns.category,
      key: "category",
      render: categories => (
        <Typography className="w-48">
          {categories.map(c => c.name).join(", ")}
        </Typography>
      ),
      title: t("post.table.title.category"),
    },
    {
      dataIndex: "lastPublishedAt",
      fixed: false,
      hidden: !visibleColumns.lastPublishedAt,
      isHidable: true,
      key: "lastPublishedAt",
      title: t("post.table.title.lastPublishedAt"),
      render: lastPublishedAt => (
        <Typography className=" text-center">
          {formateDateTime(lastPublishedAt)}
        </Typography>
      ),
    },
    {
      dataIndex: "status",
      fixed: false,
      isHidable: true,
      hidden: !visibleColumns.status,
      key: "status",
      title: t("post.table.title.status"),
      render: status => (
        <Typography className="text-center">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography>
      ),
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex max-w-24 items-center justify-center pr-2">
          <PostAction post={record} />
        </div>
      ),
      title: t("post.table.title.action"),
    },
  ];

  const rowData = posts.map(post => ({
    key: post.slug,
    category: post.categories,
    lastPublishedAt: post.updated_at,
    ...post,
  }));

  return (
    <Table
      rowSelection
      className="max-w-screen w-min"
      columnData={columnData}
      currentPageNumber={1}
      defaultPageSize={10}
      handlePageChange={() => {}}
      rowData={rowData}
      selectedRowKeys={selectedRowKeys}
      totalCount={rowData?.length}
      bulkSelectAllRowsProps={{
        selectAllRowButtonLabel: "Select all 55 users",
        selectAllRowMessage: "All 15 users on this page are selected",
        setBulkSelectedAllRows: () => {},
      }}
      onRowSelect={setSelectedRowKeys}
    />
  );
};

export default PostTable;
