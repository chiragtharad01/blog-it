import React from "react";

import classnames from "classnames";
import NavBar from "components/NavBar";
import PropTypes from "prop-types";

const Container = ({
  children,
  className = "",
  setIsSidebarOpen,
  isSidebarOpen,
}) => (
  <div className="flex ">
    <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    <div className={classnames("w-11/12", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
