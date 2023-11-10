import React from "react";
import { useSelector } from "react-redux";
import { NoteCardContainer, NoteCards } from "../../components";

const ArchiveNotes = () => {
  const archiveNotes = useSelector((state) => state.notes.archivedNotes);
  const coloredNote = useSelector((state) => state.notes.coloredNote);

  const notesColorHandler = (id) => {
    return coloredNote
      ?.filter((note) => note?.id === id)
      .map((note) => note?.color)[0];
  };

  return (
    <div className="pt-10 w-full">
      <NoteCardContainer>
        {archiveNotes?.map((note) => (
          <NoteCards
            key={note.id}
            title={note.title}
            desc={note.description}
            isArchived={true}
            id={note.id}
            color={notesColorHandler(note.id)}
          />
        ))}
      </NoteCardContainer>
    </div>
  );
};

export default ArchiveNotes;
