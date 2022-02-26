import { Avatar, Popover } from "antd";
import React from "react";
import { logo } from "../../../assets";
import { ExportOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../store/Auth";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../routes";

export const Navbar = () => {
  const [{ authLoader, isAuthenticated, user }, { onLogout }] = useAuthStore();

  let navigate = useNavigate();

  const AvatarList = () => (
    <div
      className="text-lg flex items-center justify-start cursor-pointer"
      onClick={() => onLogout(() => navigate(routes.LOGIN))}
    >
      <ExportOutlined />
      <span className="ml-2 font-medium">Logout</span>
    </div>
  );

  return (
    <header className="w-full h-20 flex justify-between items-center shadow-xl z-10">
      <Link to={routes.HOME}>
        <img src={logo} alt="MeTube" className="w-24 mx-4" />
      </Link>
      {!authLoader
        ? isAuthenticated && (
            <div className="mx-4">
              <Popover
                content={<AvatarList />}
                title={user?.name}
                trigger="hover"
                placement="bottomRight"
                className="cursor-pointer"
              >
                <Avatar
                  style={{
                    backgroundColor: "#E83600",
                    verticalAlign: "middle",
                  }}
                  size="large"
                  gap={4}
                >
                  {user?.name[0].toUpperCase()}
                </Avatar>
              </Popover>
            </div>
          )
        : null}
    </header>
  );
};
