import React, { useRef } from "react";

import { File, LeftArrow, List } from "@bigbinary/neeto-icons";
import { Avatar, Button, Popover, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import useAuthStore from "../../stores/authStore";

const NavBar = ({ setIsSidebarOpen }) => {
  const userName = useAuthStore(state => state.authUserName);
  const email = useAuthStore(state => state.authEmail);
  const logout = useAuthStore(state => state.logout);
  const buttonRef = useRef(null);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Logger.error(error);
    }
  };

  return (
    <header className="bg-primary-white w-18 sticky top-0 z-20 h-screen min-h-screen border-r-2 border-gray-100 transition-all duration-500">
      <div className="flex h-full flex-col items-center justify-between py-5">
        <div className="flex w-16 flex-col items-center gap-2">
          <Button icon={File} iconSize={16} style="tertiary" to="/dashboard" />
          <Button
            icon={List}
            iconSize={16}
            style="tertiary"
            onClick={() => setIsSidebarOpen(prev => !prev)}
          />
        </div>
        <div>
          <Button ref={buttonRef} style="link">
            <Avatar
              user={{
                name: userName,
              }}
            />
          </Button>
          <Popover reference={buttonRef}>
            <div className="w-40">
              <div className="flex gap-4 border-b border-gray-200 pb-2">
                <Avatar
                  user={{
                    name: userName,
                  }}
                />
                <div>
                  <Typography style="h6">{userName}</Typography>
                  <Typography style="body3">{email}</Typography>
                </div>
              </div>
              <div className="flex">
                <Button
                  className="p-0 pt-2 text-black"
                  icon={LeftArrow}
                  iconPosition="left"
                  label="Logout"
                  size="small"
                  style="link"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
