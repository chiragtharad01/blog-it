import React from "react";

import { Typography } from "@bigbinary/neetoui";

const Card = ({ title, description, date }) => (
  <div className="flex w-full flex-col justify-center gap-2 border-b-2 border-gray-200 py-2">
    <Typography className="text-black" style="h3" weight="bold">
      {title}
    </Typography>
    <div>
      <Typography
        className="line-clamp-2 overflow-hidden text-ellipsis text-gray-900"
        style="body3"
      >
        {description}
      </Typography>
      <Typography className="text-gray-600" style="body3">
        {date}
      </Typography>
    </div>
  </div>
);

export default Card;
