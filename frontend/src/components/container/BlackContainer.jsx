import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNoteId, modalActiveStatus } from "../../app/index";
import { getModalStatus } from "../../app/slices/modal/confirmationModalSlice";
import { frameActiveHandler } from "../../app/slices/modalFrame/modalFrameSLice";
import { UpdateNoteInput, LabelModal, ConfirmationModal } from "../";
import { useDeleteNoteLabelMutation } from "../../services/crudApi";

const BlackContainer = (props) => {
  const { visible = false } = props;
  const [deleteLabel] = useDeleteNoteLabelMutation();
  const noteId = useSelector((state) => state.notes.noteId);
  const labelModalStatus = useSelector((state) => state.noteLabel.activeStatus);
  const noteLabelId = useSelector((state) => state.noteLabel.labelId);
  const confirmationModalStatus = useSelector(
    (state) => state.confirmationModal.isActive
  );
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "clip";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const clickOutsideHandler = (e) => {
    if (noteId) dispatch(getNoteId({ id: null }));
    if (labelModalStatus) dispatch(modalActiveStatus(false));
    if (confirmationModalStatus) {
      dispatch(getModalStatus(false));
    }
    dispatch(frameActiveHandler(false));
  };

  const deleteNoteLabel = async (labelId) => {
    try {
      const data = { id: labelId };
      const response = await deleteLabel(data);
      if (response.data) {
        dispatch(getModalStatus(false));
      }
    } catch (error) {
      console.log("Error occurred while deleteing the label ", error);
    }
  };

  return (
    <div
      className={`h-full fixed top-0 bg-black bg-opacity-60 flex justify-center items-center m-auto z-50 w-full transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 invisible"
      }`}
      onClick={clickOutsideHandler}
    >
      {noteId && <UpdateNoteInput noteId={noteId} />}
      {labelModalStatus && <LabelModal />}
      {confirmationModalStatus && (
        <ConfirmationModal
          body="We’ll delete this label and remove it from all of your Keep notes.
              Your notes won’t be deleted."
          action={() => deleteNoteLabel(noteLabelId)}
        />
      )}
    </div>
  );
};

export default BlackContainer;
