import React, { useEffect, useRef, useState } from "react";

const Dropdown = (props) => {
  const { isOpen, setIsOpen, cardId, id, list, icons, action } = props;
  const [position, setPosition] = useState({ left: 0, right: null });
  const dropdownRef = useRef(null);

  useEffect(() => {
    let dropdownElement = dropdownRef.current;
    let dropdownDimension = dropdownElement.getBoundingClientRect();
    let leftDropdownPosition = dropdownDimension.left;
    let dropdownWidth = dropdownDimension.width;
    let screenWidth = window.innerWidth;

    if (dropdownWidth + leftDropdownPosition + 20 >= screenWidth) {
      setPosition({ left: null, right: 0 });
    }
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      document.body.addEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`bg-slate-200 rounded-md overflow-hidden absolute text-sm font-medium min-w-max -translate-y-5 transition duration-400 ease-in ${
        isOpen && cardId === id
          ? "opacity-1 translate-y-0 pointer-events-auto"
          : "opacity-0"
      } pointer-events-none`}
      style={{ left: position.left, right: position.right }}
    >
      <ul className="flex flex-col cursor-pointer">
        {list.map((listItem, index) => (
          <li
            onClick={(e) => {
              if (e.target.textContent === "Delete") {
                action(id);
              }
            }}
            key={index}
            className="hover:bg-slate-300 py-4 pl-3 pr-6 border-b flex gap-5 items-center"
          >
            <span>{icons[index]}</span>
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
