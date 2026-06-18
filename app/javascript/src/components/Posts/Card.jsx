import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Card = ({ slug, title, description, date }) => (
  <div className="flex w-full flex-col justify-center gap-2 border-b-2 border-gray-200 py-2">
    <NavLink to={`/posts/${slug}/show`}>
      <Typography className="text-black" style="h3" weight="semi-bold">
        {title}
      </Typography>
    </NavLink>
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
