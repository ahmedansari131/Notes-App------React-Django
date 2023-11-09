import React, { useState, useRef, useEffect } from "react";
import {
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../../services/crudApi";
import { NoteInput, Placeholder, PrimaryBtn, TertiaryBtn } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getNoteId } from "../../app/slices/updateNote/updateNoteSlice";

const UpdateNoteInput = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [title, setTitle] = useState(false);
  const [desc, setDesc] = useState(false);
  const [updateNote, { isLoading: updateNoteLoader }] = useUpdateTodoMutation();
  const { refetch } = useGetTodoListQuery();
  const dispatch = useDispatch();
  const updateNoteStatus = useSelector((state) => state.updateNote.noteId);
  const otherNotes = useSelector((state) => state.notes.notes);
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes);
  const archivedNotes = useSelector((state) => state.notes.archivedNotes);

  useEffect(() => {
    if (updateNoteStatus) {
      setDesc(true);
      setTitle(true);

      const targetPinnedNote = pinnedNotes
        ?.map((note) => note)
        .filter((item) => item.id === updateNoteStatus);

      const targetArchivedNote = archivedNotes
        ?.map((note) => note)
        .filter((item) => item.id === updateNoteStatus);

      if (targetPinnedNote.length) {
        const title = pinnedNotes
          ?.map((note) => (note.id === updateNoteStatus ? note.title : ""))
          .filter((item) => item !== "");
        const desc = pinnedNotes
          ?.map((note) =>
            note.id === updateNoteStatus ? note.description : ""
          )
          .filter((item) => item !== "");
        titleRef.current.innerText = title;
        descRef.current.innerText = desc;
      } else if (targetArchivedNote.length) {
        const title = archivedNotes
          ?.map((note) => (note.id === updateNoteStatus ? note.title : ""))
          .filter((item) => item !== "");
        const desc = archivedNotes
          ?.map((note) =>
            note.id === updateNoteStatus ? note.description : ""
          )
          .filter((item) => item !== "");
        titleRef.current.innerText = title;
        descRef.current.innerText = desc;
      } else {
        const title = otherNotes
          ?.map((note) => (note.id === updateNoteStatus ? note.title : ""))
          .filter((item) => item !== "");
        const desc = otherNotes
          ?.map((note) =>
            note.id === updateNoteStatus ? note.description : ""
          )
          .filter((item) => item !== "");
        titleRef.current.innerText = title;
        descRef.current.innerText = desc;
      }
    }
  }, [updateNoteStatus]);

  const getTitle = () => {
    const title = titleRef.current.innerText;
    if (title) setTitle(true);
    else setTitle(false);
    return title;
  };

  const getDesc = () => {
    const desc = descRef.current.innerText;
    if (desc) setDesc(true);
    else setDesc(false);
    return desc;
  };

  const closeInputHandler = () => {
    dispatch(getNoteId({ id: null }));
  };

  const noteUpdateHandler = async () => {
    const todoObj = {
      id: updateNoteStatus,
      title: getTitle(),
      description: getDesc(),
    };
    console.log(todoObj);

    if (getTitle() === "" || getDesc() === "") return;

    try {
      const response = await updateNote(todoObj);
      if (response.data.status === 200) {
        dispatch(getNoteId(getNoteId({ id: null })));
        refetch();
      }
    } catch (error) {
      console.log(`Error Occurred while updating the todo: ${error}`);
    }
  };

  return (
    <div
      className={`w-1/3 m-auto mt-10 flex flex-col gap-4 bg-slate-700 rounded-md overflow-hidden p-2 shadow-2xl py-4 absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      <div className="w-full">
        <div className="relative">
          {!title && <Placeholder text="Title" className="text-lg" />}
          <NoteInput
            action={getTitle}
            className="text-lg font-medium pb-0"
            ref={titleRef}
          />
        </div>
        <div className="relative">
          {!desc && (
            <Placeholder
              className=" text-slate-400 font-light"
              text="Take a note..."
            />
          )}
          <NoteInput
            action={getDesc}
            ref={descRef}
            className=" text-sm font-light pt-4"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <PrimaryBtn text="Update" action={noteUpdateHandler} />
        <TertiaryBtn text="Close" action={closeInputHandler} />
      </div>
    </div>
  );
};

export default UpdateNoteInput;
