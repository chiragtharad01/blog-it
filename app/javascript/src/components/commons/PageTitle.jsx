import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";

const PageTitle = ({ title, button, redirectTo, shouldShowButton }) => (
  <div className="my-8 flex w-full justify-between">
    <Typography className="text-3xl" style="h2" weight="medium">
      {title}
    </Typography>
    {shouldShowButton && (
      <Button
        className="bg-black"
        label={button}
        style="primary"
        to={redirectTo}
      />
    )}
  </div>
);

export default PageTitle;
