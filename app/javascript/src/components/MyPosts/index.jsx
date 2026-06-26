import React, { useState } from "react";

import { Filter } from "@bigbinary/neeto-icons";
import {
  ActionDropdown,
  Button,
  Checkbox,
  Pane,
  Table,
  Tooltip,
  Typography,
} from "@bigbinary/neetoui";
import { Form, Input, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { useMyPosts } from "../../hooks/reactQuery/useMyPostsApi";
import routes from "../../routes";
import { Container, PageLoader, PageTitle } from "../commons";
import PostAction from "../Posts/PostAction";
import { formateDateTime } from "../utils";

const PostsCurrentUser = () => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const { data: { data: { posts = [] } = {} } = {}, isLoading } = useMyPosts();
  const { t } = useTranslation();
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

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
      isHidable: false,
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
      isHidable: false,
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
      isHidable: false,
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
  if (isLoading) {
    return (
      <Container>
        <div className="w-full px-6">
          <PageTitle title={t("post.secondTitle")} />
          <PageLoader />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="w-full px-6">
        <PageTitle title={t("post.secondTitle")} />
        <div className="mb-4 flex justify-between">
          <Typography>15 articles</Typography>
          <div className="flex items-center gap-2">
            <ActionDropdown
              buttonStyle="secondary"
              label={t("mypost.actionDropDown.label")}
            >
              <ActionDropdown.Menu className="flex flex-col gap-2 p-2">
                <ActionDropdown.MenuItem>
                  <Checkbox
                    checked
                    disabled
                    label={t("mypost.actionDropDown.title")}
                  />
                </ActionDropdown.MenuItem>
                <ActionDropdown.MenuItem>
                  <Checkbox
                    defaultChecked
                    label={t("mypost.actionDropDown.category")}
                  />
                </ActionDropdown.MenuItem>
                <ActionDropdown.MenuItem>
                  <Checkbox
                    defaultChecked
                    label={t("mypost.actionDropDown.lastPublishedAt")}
                  />
                </ActionDropdown.MenuItem>
                <ActionDropdown.MenuItem>
                  <Checkbox
                    defaultChecked
                    label={t("mypost.actionDropDown.status")}
                  />
                </ActionDropdown.MenuItem>
              </ActionDropdown.Menu>
            </ActionDropdown>
            <Button
              className="text-black"
              icon={Filter}
              style="link"
              onClick={() => setIsPaneOpen(prev => !prev)}
            />
            <Pane
              className="w-96"
              isOpen={isPaneOpen}
              // initialFocusRef={{
              //   current: "[Circular]",
              // }}
              onClose={() => setIsPaneOpen(false)}
            >
              <Pane.Header>
                <Typography style="h2" weight="semibold">
                  {t("mypost.pane.header")}
                </Typography>
              </Pane.Header>
              <Pane.Body>
                <Form
                  className="w-full"
                  formikProps={{
                    initialValues: {
                      name: "",
                      email: "",
                      password: "",
                      password_confirmation: "",
                    },
                    // validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
                    // onSubmit: handleSubmit,
                  }}
                >
                  <div className="neeto-ui-rounded flex h-full  flex-col items-start justify-center gap-2 px-2 py-8">
                    <div className="flex w-full flex-col gap-6">
                      <Input
                        label={t("mypost.pane.inputTitle")}
                        name="title"
                        placeholder={t("mypost.pane.inputTitlePlaceholder")}
                      />
                      <Select
                        isMulti
                        isSearchable
                        label={t("mypost.pane.inputCategory")}
                        name="category_ids"
                        options={categoryOptions}
                        placeholder={t("mypost.pane.inputCategoryPlaceholder")}
                      />
                      <Select
                        isSearchable
                        label={t("mypost.pane.status")}
                        name="category_ids"
                        options={categoryOptions}
                      />
                    </div>
                  </div>
                </Form>
              </Pane.Body>
              <Pane.Footer className="flex items-center gap-x-2">
                <Button label="Continue" onClick={() => {}} />
                <Button label="Cancel" style="text" onClick={() => {}} />
              </Pane.Footer>
            </Pane>
          </div>
        </div>
        {/* <Typography className="mb-2" style="h4">
          Selected 15 of 55 users
        </Typography> */}
        <div className="w-full">
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
        </div>
      </div>
    </Container>
  );
};

export default PostsCurrentUser;
