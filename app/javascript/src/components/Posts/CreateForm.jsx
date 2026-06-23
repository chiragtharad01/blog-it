import React from "react";

import { Input, Select } from "@bigbinary/neetoui/formik";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";
import { PageLoader } from "../commons";

const CreateForm = () => {
  const { data: { data: { categories = [] } = {} } = {}, isLoading } =
    useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));
  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="neeto-ui-rounded flex w-full  flex-col items-start justify-between gap-2 border-2 px-10 py-8">
      <div className="flex w-full flex-col gap-6">
        <Input required label="Title" name="title" placeholder="Enter title" />
        <Select
          isMulti
          isSearchable
          required
          label="Category"
          name="category_ids"
          options={categoryOptions}
          placeholder="Search category"
        />
        <Input
          required
          label="Description"
          name="description"
          placeholder="Enter description"
          size="large"
        />
      </div>
    </div>
  );
};

export default CreateForm;
