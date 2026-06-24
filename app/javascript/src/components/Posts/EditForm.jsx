import React from "react";

import { Input, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { useCategories } from "../../hooks/reactQuery/useCategoriesApi";

const EditForm = () => {
  const { t } = useTranslation();
  const { data: { data: { categories = [] } = {} } = {} } = useCategories();

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="neeto-ui-rounded flex w-full flex-col items-start justify-between gap-2 border-2 px-10 py-8">
      <div className="flex w-full flex-col gap-6">
        <Input
          required
          label={t("post.create.inputTitle")}
          name="title"
          placeholder={t("post.create.inputTitlePlaceholder")}
        />
        <Select
          isMulti
          isSearchable
          required
          label={t("post.create.inputCategory")}
          name="category_ids"
          options={categoryOptions}
          placeholder={t("post.create.inputCategoryPlaceholder")}
        />
        <Input
          required
          label={t("post.create.inputDescription")}
          name="description"
          placeholder={t("post.create.inputDescriptionPlaceholder")}
          size="large"
        />
      </div>
    </div>
  );
};

export default EditForm;
