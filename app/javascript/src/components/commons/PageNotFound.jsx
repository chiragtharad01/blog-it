import React from "react";

import { NoData } from "@bigbinary/neetoui";

import routes from "../../routes";
import withT from "../../utils/withT";

const PageNotFound = ({ t }) => (
  <div className="mt-80 flex items-center justify-center">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        label: t("pageNotFound.button"),
        className: "bg-button-color",
        to: routes.dashboard,
      }}
    />
  </div>
);

export default withT(PageNotFound);
