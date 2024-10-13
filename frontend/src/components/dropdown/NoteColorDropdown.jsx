import React from "react";
import MasterDropdown from "./MasterDropdown";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useSelector } from "react-redux";

const NoteColorDropdown = (props) => {
  const { item, id: colorDropdownId, func, noteId } = props;
  const currentNoteColor = useSelector((state) => state.notes.currentColor);

  return (
    <MasterDropdown colorDropdownId={colorDropdownId}>
      <div className="flex gap-2 p-2">
        {item.map((color, index) => (
          <div
            key={index}
            className={`relative rounded-full w-9 h-9 cursor-pointer border  ${
              currentNoteColor && color.icon
                ? "border-2 border-slate-500"
                : "border-slate-600"
            }  ${
              currentNoteColor === color.color ? "" : "hover:border-white "
            } flex items-center justify-center`}
            style={{ backgroundColor: color.color }}
            onClick={() => func(noteId, color.color)}
          >
            {currentNoteColor && currentNoteColor === color.color && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 w-9 h-9 border-green-500 rounded-full">
                <div className="absolute -top-1 left-6 rounded-full bg-green-500 w-4 h-4 flex justify-center items-center">
                  <DoneOutlinedIcon style={{ fontSize: ".9rem" }} />
                </div>
              </div>
            )}
            {color.icon}
            {color.icon && !currentNoteColor && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 w-9 h-9 border-green-500 rounded-full">
                <div className="absolute -top-1 left-6 rounded-full bg-green-500 w-4 h-4 flex justify-center items-center">
                  <DoneOutlinedIcon style={{ fontSize: ".9rem" }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </MasterDropdown>
  );
};

export default NoteColorDropdown;
