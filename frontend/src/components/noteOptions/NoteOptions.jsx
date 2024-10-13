import React from "react";
import {
  NoteMoreDropdown,
  NoteColorDropdown,
  Tooltip,
  LabelDropdown,
} from "..";
import { getCurrentColor } from "../../app/index";

import { useDispatch, useSelector } from "react-redux";

const NoteOptions = (props) => {
  const { noteId, isNoteInput, cardMenus, moreLinks, colorsOpt } = props;
  const dispatch = useDispatch();
  const dropdownActive = useSelector((state) => state.dropdown.active);
  const dropdownId = useSelector((state) => state.dropdown.id);
  const dropdownParentId = useSelector((state) => state.dropdown.parentId);

  return (
    <div
      className={`flex justify-between relative rounded-md gap-5 opacity-0 group-hover:opacity-100 pb ${
        (dropdownActive && noteId === dropdownParentId) || isNoteInput
          ? "opacity-100"
          : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {cardMenus?.map((item) => (
        <div key={item.name} className={`relative`}>
          <div
            className={`rounded-sm transition-all duration-200 hover:bg-slate-600 hover:bg-opacity-50 cursor-pointer p-1 group/item`}
            onClick={(e) => {
              item.onClick ? item.onClick() : null;
              if (item.name === "COLORS") {
                dispatch(getCurrentColor({ id: noteId }));
              }
            }}
          >
            {item.icon}
            <Tooltip tip={item.name} onHover={item.name} />
          </div>

          <div>
            {dropdownActive && dropdownId === item.id && (
              <>
                {item.name === "MORE" && (
                  <NoteMoreDropdown
                    item={moreLinks}
                    id={item.id}
                    noteId={noteId}
                  />
                )}
                {item.name === "COLORS" && (
                  <NoteColorDropdown
                    item={colorsOpt}
                    id={item.id}
                    func={item.noteColorHandler}
                    noteId={noteId}
                  />
                )}
              </>
            )}
          </div>
        </div>
      ))}
      {dropdownActive && dropdownId === noteId && (
        <LabelDropdown id={dropdownId} />
      )}
    </div>
  );
};

export default NoteOptions;
