import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import {
  selectAllNotes,
  useUpdateNoteMutation,
} from "../../services/crudApi";
import { useSelector } from "react-redux";

const LabelCheckbox = (props) => {
  const { labelId, labelName, noteId } = props;
  const [checked, setChecked] = useState({});
  const [checkedLabel, setCheckedLabel] = useState();
  const [addLabelToNote] = useUpdateNoteMutation();
  const [removeLabelFromNote] = useUpdateNoteMutation();
  const notesQueryData = useSelector(selectAllNotes);

  useEffect(() => { 
    if (Object.keys(checked).length !== 0) noteLabelHandler(noteId);
  }, [checked]);

  useEffect(() => {
    let labelData = notesQueryData?.data
      .filter((note, index) => note.id === noteId)
      .map((note) => ({ labels: note.labels, noteId: note.id }));
    setCheckedLabel(labelData);
  }, [notesQueryData]);

  const getLabelNameFromQuery = (ref) => {
    const label = checkedLabel.map((labelInfo) =>
      labelInfo.labels.map((label) => label[`${ref}`])
    );
    return label;
  };

  const checkInputHandler = (labelId) => {
    if (
      getLabelNameFromQuery()[0].length ||
      Object.keys(checked).length === 0
    ) {
      if (getLabelNameFromQuery("id")[0].includes(labelId)) {
        noteLabelHandler(noteId, labelId);
        setChecked({});
      } else
        setChecked(() => ({
          id: labelId,
        }));
    }
  };

  // FUNCTION FOR ADDING AND REMOVING THE LABEL FROM THE NOTES CONDITIONALLY
  const noteLabelHandler = async (noteId, label) => {
    const data = {
      labelId: label ? label : checked?.id,
      id: noteId,
      labelStatus: label ? false : true,
    };

    try {
      if (label) await removeLabelFromNote(data);
      else await addLabelToNote(data);
    } catch (error) {
      console.log(
        "Error occurred while adding or removing label from note ",
        error
      );
    }
  };

  return (
    <div
      className="flex items-center gap-4 text-sm cursor-pointer hover:bg-slate-700 px-4 py-2 rounded-sm"
      onClick={() => {
        checkInputHandler(labelId);
      }}
    >
      <div className="relative border border-slate-300 w-3 h-3 rounded-sm">
        {(checked?.id === labelId ||
          (checkedLabel?.map((noteId) => noteId.noteId)[0] === noteId &&
            getLabelNameFromQuery("name")[0].includes(labelName))) && (
          <CheckIcon
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ fontSize: ".6rem" }}
          />
        )}
      </div>

      <div>{labelName}</div>
    </div>
  );
};

export default LabelCheckbox;
