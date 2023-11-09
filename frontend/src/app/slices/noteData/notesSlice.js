import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: null,
    pinnedNotes: null,
    archivedNotes: null,
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
    }
});

export default notesSlice.reducer;
export const { getNotes, getPinnedNotes, getArchivedNotes } = notesSlice.actions;