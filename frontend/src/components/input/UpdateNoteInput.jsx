import React, { useState, useEffect } from "react";
import { selectAllNotes, useGetNoteQuery } from "../../services/crudApi";
import { NoteInput } from "../index";
import { useSelector } from "react-redux";

const UpdateNoteInput = (props) => {
  const { noteId } = props;
  const notes = useSelector(selectAllNotes);

  const getNotesDetail = () => {
    const { title, description, color, note_image, pinned } = notes?.data.find(
      (note) => note.id === noteId
    );
    return { title, description, color, note_image, pinned };
  };

  const eventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full ">
      <NoteInput
        clickHandler={eventHandler}
        primaryBtn={"Update"}
        isFocus={true}
        bgColor={getNotesDetail().color}
        updateNoteId={noteId}
        pinnedStatus={getNotesDetail().pinned}
        title={getNotesDetail().title}
        desc={getNotesDetail().description}
        noteImg={getNotesDetail().note_image}
      />
    </div>
  );
};

export default UpdateNoteInput;
