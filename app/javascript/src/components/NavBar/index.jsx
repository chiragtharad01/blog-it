import React, { useRef } from "react";

import { File, LeftArrow, List, Templates } from "@bigbinary/neeto-icons";
import { Avatar, Button, Popover, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { resetAuthTokens } from "../../apis/axios";
import { useLogout } from "../../hooks/reactQuery/useAuthApi";
import useAuthStore from "../../stores/authStore";
import { getButtonProps } from "../utils";

const NavBar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isActive = path => location.pathname === path;
  const userName = useAuthStore(state => state.authUserName);
  const email = useAuthStore(state => state.authEmail);
  const logout = useAuthStore(state => state.logout);
  const buttonRef = useRef(null);
  const logoutMutation = useLogout();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
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
          <Button
            icon={File}
            iconSize={16}
            to="/dashboard"
            {...getButtonProps(isActive("/dashboard"))}
          />
          <Button
            icon={List}
            iconSize={16}
            {...getButtonProps(isSidebarOpen)}
            onClick={() => setIsSidebarOpen(prev => !prev)}
          />
          <Button
            icon={Templates}
            iconSize={16}
            {...getButtonProps(isActive("/posts/myposts"))}
            to="/posts/myposts"
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
                  label={t("logout")}
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
