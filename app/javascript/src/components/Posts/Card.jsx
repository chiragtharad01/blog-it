import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import routes from "../../routes";
import { formatDate } from "../utils";

const Card = ({ slug, title, description, updated_at, user, categories }) => (
  <div className="flex w-full flex-col justify-center gap-2 border-b-2 border-gray-200 py-2">
    <NavLink to={routes.posts.show(slug)}>
      <Typography className="text-black" style="h3" weight="semi-bold">
        {title}
      </Typography>
    </NavLink>
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {categories.length !== 0 &&
          categories?.map(category => (
            <Typography
              className="neeto-ui-rounded-full min-w-min bg-green-100 px-3 py-1"
              key={category.slug}
              style="nano"
            >
              {category.name}
            </Typography>
          ))}
      </div>
      <div className="flex flex-col gap-1">
        <Typography style="h6">{user.name}</Typography>
        <Typography
          className="line-clamp-2 overflow-hidden text-ellipsis text-gray-900"
          style="body3"
        >
          {description}
        </Typography>
        <Typography className="text-gray-600" style="body3">
          {formatDate(updated_at)}
        </Typography>
      </div>
    </div>
  </div>
);

export default Card;
