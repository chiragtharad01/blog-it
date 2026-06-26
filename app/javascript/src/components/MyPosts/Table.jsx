import React from "react";

import { Tooltip, Typography, Table } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import PostAction from "./PostAction";

import routes from "../../routes";
import usePostTableStore from "../../stores/postTableStore";
import { formateDateTime } from "../utils";

const PostTable = ({ posts }) => {
  const { t } = useTranslation();
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
      // width: widths.title,
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
      // width: widths.category,
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
      // width: widths.publishedAt,
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
      // width: widths.status,
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
      // width: widths.action,
    },
  ];

  const rowData = posts.map(post => ({
    key: post.slug,
    category: post.categories,
    lastPublishedAt: post.updated_at,
    ...post,
  }));
  // if (isLoading) {
  //   return (
  //     <Container>
  //       <div className="w-full px-6">
  //         <PageTitle title={t("post.secondTitle")} />
  //         <PageLoader />
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Table
      rowSelection
      className="max-w-screen w-min"
      columnData={columnData}
      currentPageNumber={1}
      defaultPageSize={rowData?.length}
      handlePageChange={() => {}}
      rowData={rowData}
      // selectedRowKeys={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
      // totalCount={rowData?.length}
      // bulkSelectAllRowsProps={{
      //   selectAllRowButtonLabel: "Select all 55 users",
      //   selectAllRowMessage: "All 15 users on this page are selected",
      //   setBulkSelectedAllRows: () => {},
      // }}
      // onColumnAdd={() => {}}
      // onColumnDelete={() => {}}
      // onColumnUpdate={() => {}}
      // onMoreActionClick={() => {}}
      // onRowClick={() => {}}
      // onRowSelect={() => {}}
    />
  );
};

export default PostTable;
