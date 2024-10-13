import React from "react";
import { useSelector } from "react-redux";
import MasterDropdown from "./MasterDropdown";
import { Search } from "@mui/icons-material";
import LabelCheckbox from "../label/LabelCheckbox";

const LabelDropdown = (props) => {
  const { id: labelDropdownId } = props;
  const noteLabels = useSelector((state) => state.noteLabel.noteLabels);

  return (
    <MasterDropdown labelDropdownId = {labelDropdownId}>
      <div className="flex flex-col py-4">
        <div className="flex flex-col gap-2 px-4 mb-3">
          <h4 className="font-medium">Label note</h4>
          <div className="relative">
            <input
              className="bg-transparent placeholder:font-sans placeholder:text-[.9rem] placeholder:font-normal outline-none border-none text-[.9rem]"
              type="text"
              placeholder="Enter label name"
            />
            <Search style={{ fontSize: "1rem" }} className="text-slate-300" />
          </div>
        </div>

        <div className="overflow-y-auto max-h-32">
          {noteLabels?.map((label) => (
            <LabelCheckbox
              key={label.id}
              labelId={label.id}
              labelName={label.name}
              noteId={labelDropdownId}
            />
          ))}
        </div>
      </div>
    </MasterDropdown>
  );
};

export default LabelDropdown;
