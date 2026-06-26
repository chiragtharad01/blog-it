import React from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import ColumnSelector from "./ColumnSelector";

const TableActions = ({ setIsPaneOpen }) => {
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex justify-between">
      <Typography>{t("myposts.count")}</Typography>
      <div className="flex items-center gap-2">
        <ColumnSelector />
        <Button
          className="text-black"
          icon={Filter}
          style="link"
          onClick={() => setIsPaneOpen(prev => !prev)}
        />
      </div>
    </div>
  );
};

export default TableActions;
