import classNames from "classnames";

export const formatDate = date =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formateDateTime = date =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

export const getButtonProps = isActive => ({
  style: isActive ? "primary" : "tertiary",
  className: classNames({
    "bg-black text-white": isActive,
  }),
});
