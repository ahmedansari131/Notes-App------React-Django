import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropdown, getCurrentColor } from "../../app/index";

const MasterDropdown = (props) => {
  const { children, moreDropdownId, colorDropdownId, labelDropdownId } = props;
  const [position, setPosition] = useState({ x: false, y: false });
  const dropdownRef = useRef(null);
  const dropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const updatePosition = () => {
      const windowHeight = window.innerHeight;
      const dropdown = dropdownRef.current;
      const {
        left,
        top,
        bottom,
        height: dropdownHeight,
      } = dropdown.getBoundingClientRect();
      
      if (Math.ceil(left) <= 0) {
        setPosition((prevPosition) => ({ ...prevPosition, x: true }));
      }
      
      // if (Math.ceil(top + dropdownHeight) >= windowHeight) {
      //   setPosition((prevPosition) => ({ ...prevPosition, y: true }));
      // }
      if (Math.ceil(bottom >= windowHeight )) {
        setPosition((prevPosition) => ({ ...prevPosition, y: true }));
      }
    };

    if (dropdownActive) {
      updatePosition();
    }
  }, [dropdownActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(dropdown(null));
        dispatch(getCurrentColor({ id: null }));
        setPosition({ x: false, y: false });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const dropdownOpt = [
    {
      name: "more",
      id: moreDropdownId,
    },

    {
      name: "colors",
      id: colorDropdownId,
    },

    {
      name: "noteLabelDropdown",
      id: labelDropdownId,
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className={`absolute z-50 w-fit ${position.y ? "bottom-full" : "top-full"} ${
        position.x ? "left-0" : "right-0"
      } bg-slate-600 shadow-2xl rounded-md whitespace-nowrap text-slate-200 overflow-hidden font-light ${
        dropdownActive && dropdownOpt.find((item) => item.id === dropdownId)
          ? "opacity-100 visible"
          : "opacity-0 invisible"
      } `}
    >
      {children}
    </div>
  );
};

export default MasterDropdown;
