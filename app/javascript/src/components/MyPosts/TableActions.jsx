import React from "react";

import { Filter } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import ColumnSelector from "./ColumnSelector";

const TableActions = ({ setIsPaneOpen }) => (
  <div className="mb-4 flex justify-end">
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

export default TableActions;
