import React, { useEffect } from "react";
import { Container, Navbar, UpdateNoteInput } from "./components";
import { Outlet } from "react-router-dom";
import { useGetTodoListQuery } from "./services/crudApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  getPinnedNotes,
  getArchivedNotes,
} from "./app/slices/noteData/notesSlice";

function App() {
  const { data, error, isLoading, refetch } = useGetTodoListQuery();
  const noteId = useSelector((state) => state.updateNote.noteId);
  const dispatch = useDispatch();

  useEffect(() => {
    const otherNotes = data
      ?.map((note) => note)
      .filter((item) => item.pinned === false && item.archived === false);
    dispatch(getNotes(otherNotes));

    const pinnedNotes = data
      ?.map((note) => note)
      .filter((item) => item.pinned === true && item.archived === false);
    dispatch(getPinnedNotes(pinnedNotes));

    const archivedNotes = data
      ?.map((note) => note)
      .filter((item) => item.archived === true);
    dispatch(getArchivedNotes(archivedNotes));
  }, [data, isLoading]);

  return (
    <>
      <div
        className={`h-full fixed top-0 bg-black bg-opacity-60 flex justify-center items-center m-auto z-50 w-full transition-all duration-300 ${
          noteId ? "opacity-100" : "opacity-0 invisible"
        }`}
      >
        <UpdateNoteInput />
      </div>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
