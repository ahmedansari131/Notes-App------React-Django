import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noteId: null,
}

const updateNoteSlice = createSlice({
    name: "updateNote",
    initialState,
    reducers: {
        getNoteId: (state, actions) => {
            state.noteId = actions.payload.id;
        },
    }
});

export default updateNoteSlice.reducer;
export const { getNoteId } = updateNoteSlice.actions;