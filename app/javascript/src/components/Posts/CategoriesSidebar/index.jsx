import React, { useEffect, useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Input, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { useCategories } from "../../../hooks/reactQuery/useCategoriesApi";
import useDebounce from "../../../utils/useDebounce";

const CategoriesSidebar = ({ setIsModalOpen }) => {
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category_ids")
      ? searchParams.get("category_ids").split(",").map(Number)
      : []
  );
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const debouncedSearchInput = useDebounce(searchInput);
  const { data: { data: { categories = [] } = {} } = {} } =
    useCategories(debouncedSearchInput);

  const handleCategoryClick = categoryId => {
    setSelectedCategories(previousCategories =>
      previousCategories.includes(categoryId)
        ? previousCategories.filter(id => id !== categoryId)
        : [...previousCategories, categoryId]
    );
  };

  const handleChange = e => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (selectedCategories.length > 0) {
      history.push({
        pathname: "/dashboard",
        search: `?category_ids=${selectedCategories?.join(",")}`,
      });
    } else {
      history.push("/dashboard");
    }
  }, [selectedCategories, history]);

  return (
    <div className="sticky top-0 z-20 h-full min-h-screen w-56 shrink-0 border-r-2 border-gray-200 bg-gray-200 transition-all duration-500">
      <div className="mt-10 flex w-full flex-col items-center gap-6 px-4">
        <div className="w-full">
          <div className="mb-2 flex w-full items-center justify-between">
            <Typography style="h5">CATEGORIES</Typography>
            <div className="flex gap-0">
              <Button
                className="m-0 p-0"
                icon={Search}
                style="text"
                onClick={() => setShowSearch(prev => !prev)}
              />
              <Button
                className="m-0 p-0"
                icon={Plus}
                iconSize="small"
                style="text"
                onClick={() => setIsModalOpen(prev => !prev)}
              />
            </div>
          </div>
          {showSearch && <Input onChange={handleChange} />}
        </div>
        <div className="flex w-full flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default CategoriesSidebar;
