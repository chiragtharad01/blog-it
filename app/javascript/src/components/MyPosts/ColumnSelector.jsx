import React from "react";

import { ActionDropdown, Checkbox } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import usePostTableStore from "../../stores/postTableStore";

const ColumnSelector = () => {
  const { t } = useTranslation();
  const visibleColumns = usePostTableStore(state => state.visibleColumns);
  const toggleColumn = usePostTableStore(state => state.toggleColumn);

  return (
    <ActionDropdown
      buttonStyle="secondary"
      label={t("mypost.actionDropDown.label")}
    >
      <ActionDropdown.Menu className="flex flex-col gap-2 p-2">
        <ActionDropdown.MenuItem>
          <Checkbox checked disabled label={t("mypost.actionDropDown.title")} />
        </ActionDropdown.MenuItem>
        <ActionDropdown.MenuItem>
          <Checkbox
            checked={visibleColumns.category}
            label={t("mypost.actionDropDown.category")}
            onChange={() => toggleColumn("category")}
          />
        </ActionDropdown.MenuItem>
        <ActionDropdown.MenuItem>
          <Checkbox
            checked={visibleColumns.lastPublishedAt}
            label={t("mypost.actionDropDown.lastPublishedAt")}
            onChange={() => toggleColumn("lastPublishedAt")}
          />
        </ActionDropdown.MenuItem>
        <ActionDropdown.MenuItem>
          <Checkbox
            checked={visibleColumns.status}
            label={t("mypost.actionDropDown.status")}
            onChange={() => toggleColumn("status")}
          />
        </ActionDropdown.MenuItem>
      </ActionDropdown.Menu>
    </ActionDropdown>
  );
};

export default ColumnSelector;
