import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdown, getCurrentColor } from "../../app/index";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";

const NoteDropdown = (props) => {
  const { item, id: noteId, caller, action } = props;
  const dropdownRef = useRef(null);
  const isDropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const currentNoteColor = useSelector((state) => state.notes.currentColor);
  const [position, setPosition] = useState({ x: false, y: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(dropdown({ id: null, active: false, calledBy: null }));
        dispatch(getCurrentColor({ id: null }));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    const updatePosition = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const dropdown = dropdownRef.current;

      const { left, top } = dropdown.getBoundingClientRect();
      const dropdownWidth = dropdown.clientWidth;
      const dropdownHeight = dropdown.clientHeight;

      if (Math.ceil(left + dropdownWidth) >= windowWidth) {
        setPosition({ x: true });
      }

      if (Math.ceil(top + dropdownHeight) >= windowHeight) {
        setPosition({ y: true });
      }
    };

    if (isDropdownActive) {
      updatePosition();
    }
  }, [isDropdownActive]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute w-fit ${position.y ? "bottom-full" : "top-full"} ${
        position.x && caller !== "colors" ? "left-full" : "right-0"
      } ${
        (caller === "colors" && position.x) || position.y
          ? ""
          : "left-1/2 -translate-x-1/2"
      } bg-slate-600 shadow-2xl rounded-md whitespace-nowrap text-slate-200 overflow-hidden font-light z-20 ${
        isDropdownActive && dropdownId === noteId
          ? "opacity-100 visible"
          : "opacity-0 hidden"
      } `}
    >
      {caller === "more" &&
        item?.map((link) => (
          <div
            onClick={() => {
              link.name === "Delete" ? link.action(noteId) : "";
            }}
            key={link.name}
            className="py-2 px-5 cursor-pointer hover:bg-slate-700"
          >
            {link.name}
          </div>
        ))}

      {caller === "colors" && (
        <>
          <div className="flex gap-2 p-2">
            {item.map((color, index) => (
              <div
                key={index}
                className={`relative rounded-full w-9 h-9 cursor-pointer border ${
                  currentNoteColor && color.icon
                    ? "border-2 border-slate-500"
                    : ""
                } border-slate-600 ${
                  currentNoteColor === color.color ? "" : "hover:border-white "
                } flex items-center justify-center`}
                style={{ backgroundColor: color.color }}
                onClick={() => action(noteId, color.color)}
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
        </>
      )}
    </div>
  );
};

export default NoteDropdown;
