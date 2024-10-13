import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: null,
    pinnedNotes: null,
    archivedNotes: null,
    coloredNote: [],
    currentColor: null,
    noteId: null,
}

const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        getNotes: (state, actions) => {
            state.notes = actions.payload;
        },

        getPinnedNotes: (state, actions) => {
            state.pinnedNotes = actions.payload;
        },

        getArchivedNotes: (state, actions) => {
            state.archivedNotes = actions.payload;
        },

        getColor: (state, action) => {
            const existingIndex = state.coloredNote.findIndex(
                (note) => note.id === action.payload.id
            );

            if (existingIndex !== -1) {
                state.coloredNote.splice(existingIndex, 1);
            }

            state.coloredNote.push(action.payload);
        },

        getCurrentColor: (state, actions) => {
            const matchedNote = state.coloredNote.find((note) => note.id === actions.payload?.id);
            if (matchedNote) {
                state.currentColor = matchedNote.color;
            }
            else{
                state.currentColor = null;
            }

        },

        getNoteId: (state, actions) => {
            state.noteId = actions.payload.id;
        }
    }
});

export default notesSlice.reducer;
export const { getNotes, getPinnedNotes, getArchivedNotes, getColor, getCurrentColor, getNoteId } = notesSlice.actions;