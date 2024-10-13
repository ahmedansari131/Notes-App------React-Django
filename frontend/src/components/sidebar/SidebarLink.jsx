import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { modalActiveStatus } from "../../app/index";
import { frameActiveHandler } from "../../app/slices/modalFrame/modalFrameSLice";

const SidebarLink = (props) => {
  const dispatch = useDispatch();

  const { path, icon } = props;
  const linkActiveStyle = {
    backgroundColor: "bg-green-700",
  };

  const linkHoverStyle = {
    backgroundColor: "hover:bg-slate-700",
  };

  const noteLabelModalHandler = () => {
    dispatch(frameActiveHandler(true));
    dispatch(modalActiveStatus(true));
  }

  return path === "" ? (
    <div className="relative z-30 transition-all duration-200 cursor-pointer hover:bg-slate-700 p-2" onClick={noteLabelModalHandler}>
      {icon}
    </div>
  ) : (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive
            ? `${linkActiveStyle.backgroundColor}`
            : `${linkHoverStyle.backgroundColor}`
        } p-2 transition-all duration-300 first:rounded-tl-md first:rounded-tr-md last:rounded-bl-md last:rounded-br-md`
      }
    >
      <div className="relative z-30 transition-all duration-200 cursor-pointer ">
        {icon}
      </div>
    </NavLink>
  );
};

export default SidebarLink;
