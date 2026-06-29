import React from "react";

import { DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import { Button, Tag, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

import {
  useDownvotePost,
  useUpvotePost,
} from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import { formatDate } from "../utils";

const Card = ({
  slug,
  title,
  description,
  updated_at,
  user,
  categories,
  upvotes,
  downvotes,
  is_bloggable,
  current_user_vote,
}) => {
  const { t } = useTranslation();
  const upvote = useUpvotePost();
  const downvote = useDownvotePost();
  const handleUpvote = async () => {
    try {
      await upvote.mutateAsync(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleDownvote = async () => {
    try {
      await downvote.mutateAsync(slug);
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-gray-200 px-4 py-2">
      <div className="flex w-full flex-col justify-center gap-2 ">
        <div className="flex items-center gap-4">
          <NavLink to={routes.posts.show(slug)}>
            <Typography className="text-black" style="h3" weight="semi-bold">
              {title}
            </Typography>
          </NavLink>
          {is_bloggable && (
            <Tag
              className="bg-white"
              label={t("blogIt")}
              style="primary"
              type="outline"
            />
          )}
        </div>
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
      <div className="flex flex-col items-center gap-2">
        <Button
          disabled={upvote.isLoading || downvote.isLoading}
          icon={UpArrow}
          iconSize={16}
          style="text"
          className={classNames({
            "text-green-500": current_user_vote === "upvote",
          })}
          onClick={handleUpvote}
        />
        <Typography style="h6">{upvotes - downvotes}</Typography>
        <Button
          disabled={upvote.isLoading || downvote.isLoading}
          icon={DownArrow}
          iconSize={16}
          style="text"
          className={classNames({
            "text-red-600": current_user_vote === "downvote",
          })}
          onClick={handleDownvote}
        />
      </div>
    </div>
  );
};

export default Card;
