import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdown } from "../../app/index";

const NoteDropdown = (props) => {
  const { links, id:noteId } = props;
  const dropdownRef = useRef(null);
  const isDropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(dropdown({ id: null, active: false }));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const dropdownWidth = dropdownRef.current.clientWidth;
    const dropdownHeight = dropdownRef.current.clientHeight;
    const dropdown = dropdownRef.current;
    const dropdownPositionX =
      dropdown.getBoundingClientRect().left + dropdownWidth;
    const dropdownPositionY =
      dropdown.getBoundingClientRect().top + dropdownHeight;

    if (dropdownPositionX >= windowWidth) {
      setPositionX("right");
    }

    if (dropdownPositionY >= windowHeight) {
      setPositionY("bottom");
    }
  }, [isDropdownActive]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${positionY}-full ${positionX}-0 bg-slate-600 shadow-2xl rounded-md whitespace-nowrap text-slate-200 overflow-hidden font-light z-20 ${
        isDropdownActive && dropdownId === noteId
          ? "opacity-100 visible"
          : "opacity-0 hidden"
      } transition-all duration-300 `}
    >
      {links.map((link) => (
        <div
          onClick={() => {
            link.name === "Delete" ? link.action(noteId) : ""
          }}
          key={link.name}
          className="py-2 px-5 cursor-pointer hover:bg-slate-700"
        >
          {link.name}
        </div>
      ))}
    </div>
  );
};

export default NoteDropdown;
