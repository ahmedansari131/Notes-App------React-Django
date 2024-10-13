import React, { useEffect, useState } from "react";
import { useUpdateNoteMutation } from "../../services/crudApi";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const PinNote = (props) => {
  const { pinnedStatus, id: noteId, isUpdateNoteInput = false } = props;
  const [updateNote] = useUpdateNoteMutation();
  const [pinned, setPinned] = useState(pinnedStatus);

  const pinNoteHandler = async (e) => {
    e.stopPropagation();
    const noteObj = {
      id: noteId,
      pin: true,
    };

    try {
      if (noteObj.id && noteObj.pin) {
        const response = await updateNote(noteObj);
        setPinned((prev) => !prev);
      }
    } catch (error) {
      console.log("Error occurred while pinning the note ", error);
    }
  };

  useEffect(() => {
    setPinned(pinnedStatus);
  }, [pinnedStatus]);

  return (
    <div
      className={`rounded-sm transition-all duration-200 group-hover:opacity-100 ${
        isUpdateNoteInput ? "opacity-100 top-4" : "opacity-0 top-5"
      }  hover:bg-slate-600 hover:bg-opacity-50 p-1 cursor-pointer absolute z-10 right-4
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {!pinned ? (
        <PushPinOutlinedIcon
          className={`text-slate-200 p-1`}
          style={{ fontSize: "1.8rem" }}
          onClick={(e) => pinNoteHandler(e, noteId)}
        />
      ) : (
        <PushPinIcon
          className={`text-slate-200 p-1`}
          style={{ fontSize: "1.8rem" }}
          onClick={(e) => pinNoteHandler(e, noteId)}
        />
      )}
    </div>
  );
};

export default PinNote;
