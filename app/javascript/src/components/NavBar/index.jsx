import React from "react";

import { File } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

const NavBar = () => (
  <header className="bg-primary-white w-18 sticky top-0 z-20 h-full min-h-screen border-r-2 border-gray-100 transition-all duration-500">
    <div className="mt-5 flex w-16 flex-col items-center">
      <Button icon={File} iconSize={16} style="tertiary" to="/dashboard" />
    </div>
  </header>
);

export default NavBar;
