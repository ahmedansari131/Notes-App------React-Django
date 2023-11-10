import React, { useEffect, useState } from "react";
import { AddNoteInput, NoteCardContainer, NoteCards } from "../../components";
import { useDispatch, useSelector } from "react-redux";

const Todo = () => {
  const otherNotes = useSelector((state) => state.notes.notes);
  const pinnedNotes = useSelector((state) => state.notes.pinnedNotes);
  const [pinnedNote, setPinnedNote] = useState(null);
  const coloredNote = useSelector((state) => state.notes.coloredNote);

  useEffect(() => {
    setPinnedNote(pinnedNotes);
  }, [pinnedNotes]);

  const notesColorHandler = (id) => {
    return coloredNote
      ?.filter((note) => note?.id === id)
      .map((note) => note?.color)[0];
  };

  return (
    <>
      <div className="bg-slate-900 w-full">
        <AddNoteInput />

        {/* PINNED NOTES */}
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
                  color={notesColorHandler(item.id)}
                />
              ))}
            </NoteCardContainer>
          </div>
        )}

        {/* OTHER NOTES */}
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
                  color={notesColorHandler(item.id)}
                />
              ))}
          </NoteCardContainer>
        </div>
      </div>
    </>
  );
};

export default Todo;
