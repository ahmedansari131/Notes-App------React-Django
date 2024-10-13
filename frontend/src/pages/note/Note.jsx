import React, { useEffect, useState } from "react";
import {
  EmptyNotesBanner,
  NoteCardContainer,
  NoteCards,
  NoteInput,
} from "../../components";
import { useSelector } from "react-redux";
import { DescriptionOutlined } from "@mui/icons-material";

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
      <div className="bg-slate-900 w-full h-full">
        <NoteInput />

        {pinnedNote?.length === 0 && otherNotes?.length === 0 && (
          <EmptyNotesBanner
            placeholderText="Your notes will appear here"
            placeholderIcon={
              <DescriptionOutlined
                className="text-slate-800"
                style={{ fontSize: "7rem" }}
              />
            }
          />
        )}

        {/* PINNED NOTES */}
        {pinnedNote?.length > 0 && (
          <div className="mt-5 mb-16">
            <h2 className="text-slate-300 text-[.7rem] uppercase font-light tracking-widest mb-3 ml-14 inline-block">
              Pinned
            </h2>

            <NoteCardContainer>
              {pinnedNote?.map((item, index) => (
                <NoteCards
                  key={item.id}
                  title={item.title}
                  desc={item.description}
                  id={item.id}
                  pinned={true}
                  color={notesColorHandler(item.id)}
                  label={item.labels}
                  image={item.note_image}
                />
              ))}
            </NoteCardContainer>
          </div>
        )}

        {/* OTHER NOTES */}
        <div className="mt-14">
          {pinnedNote?.length > 0 && otherNotes?.length > 0 && (
            <h2 className="text-slate-300 text-[.7rem] uppercase font-light tracking-widest mb-3 ml-14">
              Others
            </h2>
          )}
          <NoteCardContainer>
            {otherNotes?.map((item, index) => (
              <NoteCards
                key={item.id}
                title={item.title}
                desc={item.description}
                id={item.id}
                pinned={false}
                color={notesColorHandler(item.id)}
                label={item.labels}
                image={item.note_image}
              />
            ))}
          </NoteCardContainer>
        </div>
      </div>
    </>
  );
};

export default Todo;
