import React from "react";
import { useSelector } from "react-redux";
import {
  EmptyNotesBanner,
  NoteCardContainer,
  NoteCards,
} from "../../components";
import { ArchiveOutlined } from "@mui/icons-material";

const ArchiveNotes = () => {
  const archiveNotes = useSelector((state) => state.notes.archivedNotes);
  const coloredNote = useSelector((state) => state.notes.coloredNote);

  const notesColorHandler = (id) => {
    return coloredNote
      ?.filter((note) => note?.id === id)
      .map((note) => note?.color)[0];
  };

  return (
    <div className="pt-10 w-full flex justify-center items-center">
      {archiveNotes?.length === 0 && (
        <EmptyNotesBanner
          placeholderText="Your archived notes will appear here"
          placeholderIcon={
            <ArchiveOutlined
              className="text-slate-800"
              style={{ fontSize: "7rem" }}
            />
          }
        />
      )}
      <NoteCardContainer>
        {archiveNotes?.map((note) => (
          <NoteCards
            key={note.id}
            title={note.title}
            desc={note.description}
            isArchived={true}
            id={note.id}
            color={notesColorHandler(note.id)}
            label={note.labels}
            image={note.note_image}
          />
        ))}
      </NoteCardContainer>
    </div>
  );
};

export default ArchiveNotes;
