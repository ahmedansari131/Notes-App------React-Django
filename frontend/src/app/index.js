import notesSlice from "./slices/noteData/notesSlice";
import { getNotes, getPinnedNotes, getArchivedNotes, getColor, getCurrentColor, getNoteId } from "./slices/noteData/notesSlice";
import dropdownSlice from "./slices/dropdown/dropdownSlice";
import { dropdown } from "./slices/dropdown/dropdownSlice";
import labelSlice from "./slices/label/labelSlice";
import { modalActiveStatus, getAllNoteLabels, labelActive } from "./slices/label/labelSlice";
import confirmationModalSlice from "./slices/modal/confirmationModalSlice";
import modalFrameSlice from "./slices/modalFrame/modalFrameSLice";
import snackbarSlice from "./slices/snackbar/snackbarSlice";

export{
    notesSlice,
    getNotes,
    getNoteId,
    getPinnedNotes,
    getArchivedNotes,
    dropdown,
    dropdownSlice,
    getColor,
    getCurrentColor,
    labelSlice,
    modalActiveStatus,
    getAllNoteLabels,
    labelActive,
    confirmationModalSlice,
    modalFrameSlice,
    snackbarSlice,
}