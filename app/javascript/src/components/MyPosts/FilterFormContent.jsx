import React from "react";

import { Input, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";

const FilterFormContent = () => {
  const { t } = useTranslation();
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();
  const categoryOptions = categories.map(category => ({
    value: category.slug,
    label: category.name,
  }));

  const statusOptions = [
    {
      value: "publish",
      label: t("mypost.dropDown.publish"),
    },
    {
      value: "draft",
      label: t("mypost.dropDown.draft"),
    },
  ];

  return (
    <div className="neeto-ui-rounded flex h-full  w-full flex-col items-start justify-start gap-2 px-2 py-4">
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
          isClearable
          label={t("mypost.pane.status")}
          name="status"
          options={statusOptions}
        />
      </div>
    </div>
  );
};

export default FilterFormContent;
