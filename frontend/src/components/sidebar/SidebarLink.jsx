import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLink = (props) => {
  const { path, icon } = props;
  const linkActiveStyle = {
    backgroundColor: "bg-green-700",
  };

  const linkHoverStyle = {
    backgroundColor: "hover:bg-slate-700",
  };

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive ? `${linkActiveStyle.backgroundColor}` : `${
            linkHoverStyle.backgroundColor
          }`
        } py-2 px-2 transition-all duration-300 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md`
      }
    >
      <div className="relative z-30 transition-all duration-200 cursor-pointer ">
        {icon}
      </div>
    </NavLink>
  );
};

export default SidebarLink;
