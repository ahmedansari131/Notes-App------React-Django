import React from "react";
import { useSelector } from "react-redux";
import { NoteCardContainer, NoteCards } from "../../components";

const ArchiveNotes = () => {
  const archiveNotes = useSelector((state) => state.notes.archivedNotes);
  return (
    <div className="pt-10">
      <NoteCardContainer>
        {archiveNotes?.map((note) => (
          <NoteCards
            key={note.id}
            title={note.title}
            desc={note.description}
            isArchived={true}
            id={note.id}
          />
        ))}
      </NoteCardContainer>
    </div>
  );
};

export default ArchiveNotes;
