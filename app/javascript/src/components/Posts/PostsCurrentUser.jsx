import React from "react";

import { Table, Tooltip, Typography } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import PostAction from "./PostAction";

import { usePosts } from "../../hooks/reactQuery/usePostsApi";
import { useTableWidths } from "../../hooks/tableWidth";
import { Container, PageLoader, PageTitle } from "../commons";
import { formateDateTime } from "../utils";

const PostsCurrentUser = () => {
  const { data: { data: { posts = [] } = {} } = {}, isLoading } = usePosts();
  const widths = useTableWidths();
  const columnData = [
    {
      dataIndex: "title",
      fixed: true,
      isHidable: false,
      render: (_, record) => (
        <Tooltip content={record.title} position="right">
          <div className="flex items-center">
            <NavLink to={`/posts/${record.slug}/edit`}>
              <Typography
                className="overflow-hidden truncate text-ellipsis text-green-600"
                style="body2"
              >
                {record.title}
              </Typography>
            </NavLink>
          </div>
        </Tooltip>
      ),
      key: "title",
      title: "TITLE",
      width: widths.title,
    },
    {
      dataIndex: "category",
      fixed: false,
      isHidable: false,
      key: "category",
      render: categories => (
        <Typography className="">
          {categories.map(c => c.name).join(", ")}
        </Typography>
      ),
      title: "CATEGORY",
      width: widths.category,
    },
    {
      dataIndex: "lastPublishedAt",
      fixed: false,
      isHidable: false,
      key: "lastPublishedAt",
      title: "LAST PUBLISHED AT",
      render: lastPublishedAt => (
        <Typography className=" text-center">
          {formateDateTime(lastPublishedAt)}
        </Typography>
      ),
      width: widths.publishedAt,
    },
    {
      dataIndex: "status",
      fixed: false,
      isHidable: false,
      key: "status",
      title: "STATUS",
      render: status => (
        <Typography className=" text-center">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Typography>
      ),
      width: widths.status,
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-center pr-2">
          <PostAction post={record} />
        </div>
      ),
      title: "Action",
      width: widths.action,
    },
  ];

  const rowData = posts.map(post => ({
    key: post.slug,
    category: post.categories,
    lastPublishedAt: post.created_at,
    ...post,
  }));
  if (isLoading) {
    return (
      <Container>
        <div className="w-full px-6">
          <PageTitle title="My blog posts" />
          <PageLoader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full px-6">
        <PageTitle title="My blog posts" />
        {/* <Typography className="mb-2" style="h4">
          Selected 15 of 55 users
        </Typography> */}
        <div className="w-full">
          <Table
            rowSelection
            className="w-full"
            columnData={columnData}
            currentPageNumber={1}
            defaultPageSize={rowData?.length}
            handlePageChange={() => {}}
            rowData={rowData}
            // selectedRowKeys={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
            totalCount={rowData?.length}
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
        </div>
      </div>
    </Container>
  );
};

export default PostsCurrentUser;
