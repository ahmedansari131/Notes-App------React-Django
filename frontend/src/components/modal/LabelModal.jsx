import React from "react";
import TertiaryBtn from "../buttons/TertiaryBtn";
import { NoteLabelInput } from "..";
import { useDispatch, useSelector } from "react-redux";
import { modalActiveStatus } from "../../app/index";

const LabelModal = () => {
  const dispatch = useDispatch();
  const allNoteLabels = useSelector((state) => state.noteLabel.noteLabels);

  return (
    <div
      className="w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-700 shadow-2xl text-gray-200 rounded-md overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overflow-y-auto max-h-96">
        <div className="flex flex-col gap-2 p-6">
          <div className="mb-5">
            <h3 className="font-medium text-lg">Edit labels</h3>
          </div>

          <div className="flex flex-col gap-5">
            <NoteLabelInput />

            {allNoteLabels?.map((label) => (
              <NoteLabelInput
                key={label.id}
                label={allNoteLabels}
                labelName={label.name}
                labelId={label.id}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t w-full text-right border-slate-500 p-3 sticky bottom-0 right-0 bg-slate-700 shadow-2xl z-50">
        <TertiaryBtn
          text="Done"
          action={() => {
            // createNoteLabel();
            dispatch(modalActiveStatus(false));
          }}
        />
      </div>
    </div>
  );
};

export default LabelModal;
