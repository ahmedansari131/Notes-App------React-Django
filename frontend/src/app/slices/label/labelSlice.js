import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeStatus: false,
    noteLabels: null,
    labelId: null,
}

const labelSlice = createSlice({
    name: "label",
    initialState,
    reducers: {
        modalActiveStatus: (state, actions) => {
            state.activeStatus = actions.payload;
        },

        getAllNoteLabels: (state, actions) => {
            state.noteLabels = actions.payload;
        },

        labelActive: (state, actions) => {
            if (state.labelId === actions.payload.id) state.labelId = null;
            else state.labelId = actions.payload.id;
        },
    }
});

export default labelSlice.reducer;
export const { modalActiveStatus, getAllNoteLabels, labelActive } = labelSlice.actions;