import updateNoteSlice from "./slices/updateNote/updateNoteSlice";
import notesSlice from "./slices/noteData/notesSlice";
import { getNotes, getPinnedNotes, getArchivedNotes } from "./slices/noteData/notesSlice";
import { getNoteId } from "./slices/updateNote/updateNoteSlice";
import dropdownSlice from "./slices/dropdown/dropdownSlice";
import { dropdown } from "./slices/dropdown/dropdownSlice";

export{
    updateNoteSlice,
    notesSlice,
    getNotes,
    getNoteId,
    getPinnedNotes,
    getArchivedNotes,
    dropdown,
    dropdownSlice,
}