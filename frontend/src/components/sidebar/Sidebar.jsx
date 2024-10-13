import React from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  const iconClassName =
    "text-slate-300 p-1 rounded-sm text-xl cursor-pointer transition-all duration-400";

  const iconSize = "2.2rem";

  const links = [
    {
      path: "/",
      icon: (
        <DescriptionOutlinedIcon
          className={`${iconClassName}`}
          style={{ fontSize: `${iconSize}` }}
        />
      ),
    },

    {
      path: "",
      icon: (
        <ModeEditOutlineOutlinedIcon
          className={`${iconClassName}`}
          style={{ fontSize: `${iconSize}` }}
        />
      ),
    },

    {
      path: "archive",
      icon: (
        <ArchiveOutlinedIcon
          className={`${iconClassName}`}
          style={{ fontSize: `${iconSize}` }}
        />
      ),
    },

    // {
    //   path: "trash",
    //   icon: (
    //     <DeleteOutlinedIcon
    //       className={`${iconClassName}`}
    //       style={{ fontSize: `${iconSize}` }}
    //     />
    //   ),
    // },
  ];

  return (
    <div className="shadow-2xl h-full text-slate-200 sticky top-32 bg-slate-950 bg-opacity-20 border border-slate-700 rounded-md flex justify-center flex-col items-center">
      {links.map((link) => (
        <SidebarLink key={link.path} path={link.path} icon={link.icon} />
      ))}
    </div>
  );
};

export default Sidebar;
