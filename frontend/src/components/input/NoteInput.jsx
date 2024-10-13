import React, { useEffect, useRef, useState } from "react";
import {
  Placeholder,
  TertiaryBtn,
  PrimaryBtn,
  PinNote,
  NoteOptions,
} from "../index.js";
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteImageMutation,
} from "../../services/crudApi";
import { useDispatch } from "react-redux";
import { getNoteId } from "../../app/index.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { frameActiveHandler } from "../../app/slices/modalFrame/modalFrameSLice.js";

const TodoInput = (props) => {
  const {
    noteColor,
    updateNoteId,
    pinnedStatus,
    bgColor,
    title = "",
    desc = "",
    clickHandler,
    isFocus = false,
    noteImg,
  } = props;
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNoteImage] = useDeleteNoteImageMutation();
  const [focus, setFocus] = useState(isFocus);
  const [noteObject, setNoteObject] = useState({
    title: title,
    description: desc,
  });
  const dispatch = useDispatch();

  const noteSaveHandler = async () => {
    try {
      if (updateNoteId) {
        noteObject.id = updateNoteId;
        const response = await updateNote(noteObject);
        if (response.data) {
          dispatch(getNoteId(updateNoteId));
          dispatch(frameActiveHandler(false));
        }
      } else {
        const response = await createNote(noteObject);
        setNoteObject({ title: "", description: "" });
      }
    } catch (error) {
      console.log(
        `Error occurred while creating or updating the note: ${error}`
      );
    }
  };

  const closeInputHandler = () => {
    if (updateNoteId) {
      dispatch(getNoteId({ id: null }));
      dispatch(frameActiveHandler(false));
    } else {
      setFocus(false);
      setNoteObject({ title: "", description: "" });
    }
  };

  const noteImageDeleteHandler = async () => {
    try {
      const response = await deleteNoteImage(updateNoteId);
    } catch (error) {
      console.log("Error occured while deleting the note image");
    }
  };

  return (
    <div
      className="w-[40%] m-auto rounded-md bg-slate-700 shadow-2xl relative "
      style={{ backgroundColor: bgColor }}
      onClick={(e) => (updateNoteId ? clickHandler(e) : null)}
    >
      {noteImg && ( 
        <div className="relative group object-fill overflow-y-auto max-h-[30rem]">
          <img className="w-full h-full" src={noteImg} />
          <span
            onClick={noteImageDeleteHandler}
            className="sticky bottom-5 left-[92%] p-2 rounded-sm cursor-pointer bg-slate-800 opacity-0 transition-all duration-300 invisible group-hover:opacity-100 group-hover:visible text-gray-300 hover:bg-slate-900 shadow-md"
          >
            <DeleteIcon />
          </span>
        </div>
      )}

      {focus && (
        <div>
          <PinNote
            id={updateNoteId}
            isUpdateNoteInput={true}
            pinnedStatus={pinnedStatus}
          />
        </div>
      )}

      {focus && (
        <div className="relative px-5 pt-2">
          <input
            className={`w-full resize-none outline-none py-3 h-full relative text-white bg-inherit font-[roboto]`}
            style={{ backgroundColor: noteColor }}
            value={noteObject.title}
            placeholder="Title"
            onChange={(e) => {
              setNoteObject((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>
      )}

      <div className="relative px-5" onClick={(e) => setFocus(true)}>
        <input
          className={`w-full resize-none outline-none py-3 h-15 relative text-white bg-inherit font-[roboto]`}
          style={{ backgroundColor: noteColor }}
          placeholder="Take a note..."
          value={noteObject.description}
          onChange={(e) => {
            setNoteObject((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />
      </div>

      {focus && (
        <div
          className={`flex justify-between items-center gap-4 sticky w-full bottom-0 bg-slate-700 p-2 rounded-md ${
            updateNoteId ? "shadow-[0_35px_60px_-15px_rgba(0,0,0,.7)]" : ""
          } `}
        >
          <NoteOptions isNoteInput={true} />

          <div className="flex items-center gap-3 ">
            <PrimaryBtn
              text={`${updateNoteId ? "Update" : "Save"}`}
              action={noteSaveHandler}
            />
            <TertiaryBtn
              text="Close"
              action={closeInputHandler}
              textColor="text-slate-300"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoInput;
