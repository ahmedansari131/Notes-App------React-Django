import React, { useEffect, useState } from "react";
import {
  AddNoteInput,
  NoteCardContainer,
  NoteCards,
  UpdateNoteInput,
} from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetTodoListQuery,
  useUpdateTodoMutation,
} from "../../services/crudApi";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const Todo = () => {
  const { refetch } = useGetTodoListQuery();
  const noteId = useSelector((state) => state.updateNote.noteId);
  const otherNotes = useSelector((state) => state.notes.notes);
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes);
  const [pinnedNote, setPinnedNote] = useState(null);
  const [updateNote, { isLoading: updateNoteLoader }] = useUpdateTodoMutation();

  useEffect(() => {
    setPinnedNote(pinnedNotes);
  }, [pinnedNotes]);

  // const pinNoteHandler = async (e, id) => {
  //   e.stopPropagation();
  //   const noteObj = {
  //     id: id,
  //     pin: true,
  //   };

  //   try {
  //     const response = await updateNote(noteObj);
  //     refetch();
  //   } catch (error) {
  //     console.log("Error occurred while pinning the note ", error);
  //   }
  // };

  return (
    <>
      <div className="bg-slate-900">
        <AddNoteInput />

        {pinnedNote?.length && (
          <div className="mt-5 mb-16">
            <h2 className="text-slate-300 text-[.7rem] uppercase font-light tracking-widest mb-3 ml-14 inline-block">
              Pinned
            </h2>

            <NoteCardContainer>
              {pinnedNote?.map((item) => (
                <NoteCards
                  key={item.id}
                  title={item.title}
                  desc={item.description}
                  id={item.id}
                  pinned={true}
                />
              ))}
            </NoteCardContainer>
          </div>
        )}

        <div className="mt-5">
          {pinnedNote?.length && (
            <h2 className="text-slate-300 text-[.7rem] uppercase font-light tracking-widest mb-3 ml-14">
              Others
            </h2>
          )}
          <NoteCardContainer>
            {otherNotes &&
              otherNotes?.map((item) => (
                <NoteCards
                  key={item.id}
                  title={item.title}
                  desc={item.description}
                  id={item.id}
                  pinned={false}
                />
              ))}
          </NoteCardContainer>
        </div>
      </div>
    </>
  );
};

export default Todo;
