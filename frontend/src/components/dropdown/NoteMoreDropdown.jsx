import React from "react";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import MasterDropdown from "./MasterDropdown";
import { useSelector } from "react-redux";
import LabelDropdown from "./LabelDropdown";

const NoteDropdown = (props) => {
  const { item, id: moreDropdownId, noteId } = props;

  return (
    <>
      <MasterDropdown moreDropdownId={moreDropdownId}>
        {item?.map((link) => (
          <div
            onClick={() => {
              link.func(noteId);
            }}
            key={link.name}
            className="py-2 px-5 cursor-pointer hover:bg-slate-700"
          >
            {link.name}
          </div>
        ))}
      </MasterDropdown>
    </>
  );
};

export default NoteDropdown;
