import { CloseRounded } from "@mui/icons-material";
import React, { useLayoutEffect, useRef } from "react";

const NoteLabel = (props) => {
  const { label } = props;
  const labelContainerRef = useRef(null);

  return (
    <div
      className="flex items-center gap-2 flex-wrap max-w-fit py-5"
      onClick={(e) => e.stopPropagation()}
    >
      {label?.map((label) => (
        <div
          id={`label-${label.id}`}
          ref={labelContainerRef}
          key={label.id}
          className="flex items-center relative group/item rounded-full w-fit px-3 py-1 bg-transparent border border-slate-400 text-slate-300 text-[.6rem] font-medium"
        >
          <div>{label.name}</div>

          <div className="hidden group-hover/item:block absolute right-2">
            <CloseRounded
              className="hover:bg-slate-800 hover:bg-opacity-50 rounded-full"
              style={{ fontSize: ".9rem" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteLabel;
