import React from "react";

import { NoData, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { isEmpty, isNil } from "ramda";
import { useTranslation } from "react-i18next";

import { PageLoader } from "../../commons";

const CategoriesContainer = ({
  categories,
  handleCategoryClick,
  selectedCategories,
  isLoading,
}) => {
  const { t } = useTranslation();
  if (isLoading) {
    return <PageLoader />;
  }

  if (isEmpty(categories) || isNil(categories)) {
    return <NoData title={t("categories.noCategories")} />;
  }

  return (
    <>
      {categories?.map(category => (
        <div
          key={category.id}
          className={classNames(
            "neeto-ui-rounded border border-gray-300 px-2 py-1 shadow",
            {
              "bg-white": selectedCategories.includes(category.id),
            }
          )}
          onClick={() => handleCategoryClick(category.id)}
        >
          <Typography style="body1">{category.name}</Typography>
        </div>
      ))}
    </>
  );
};

export default CategoriesContainer;
