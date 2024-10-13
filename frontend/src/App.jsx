import React, { useEffect } from "react";
import {
  BlackContainer,
  ConfirmationModal,
  Container,
  LabelModal,
  Navbar,
  Snackbar,
  UpdateNoteInput,
} from "./components";
import { Outlet } from "react-router-dom";
import {
  useDeleteNoteLabelMutation,
  useGetAllNoteLabelQuery,
  useGetTodoListQuery,
} from "./services/crudApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotes,
  getPinnedNotes,
  getArchivedNotes,
  getColor,
} from "./app/slices/noteData/notesSlice";
import { getAllNoteLabels } from "./app/slices/label/labelSlice";

function App() {
  const { data, isLoading } = useGetTodoListQuery();
  const { data: noteLabels, isLoading: noteLabelsLoader } =
    useGetAllNoteLabelQuery();
  const dispatch = useDispatch();
  const isModalFrameActive = useSelector((state) => state.modalFrame.active);
  const isLabelModalActive = useSelector(
    (state) => state.noteLabel.activeStatus
  );

  useEffect(() => {
    if (!isLoading && data) {
      data.forEach((note) => {
        if (note.color !== "") dispatch(getColor(note));
      });
    }
  }, [isLoading, data]);

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

  useEffect(() => {
    dispatch(getAllNoteLabels(noteLabels));
  }, [noteLabels, noteLabelsLoader]);

  return (
    <>
      <Snackbar />
      {isModalFrameActive && isLabelModalActive && (
        <BlackContainer visible={true} />
      )}

      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
