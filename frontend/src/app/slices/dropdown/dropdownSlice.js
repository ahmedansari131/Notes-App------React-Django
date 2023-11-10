import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    id: null,
    calledBy: null,
};

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        dropdown: (state, action) => {
            if (state.id === action.payload.id) {
                state.active = !state.active;
                state.id = null;
                state.calledBy = null;
            } else if (action.payload.id === null) {
                state.active = action.payload.active;
                state.id = action.payload.id;
                state.calledBy = action.payload.calledBy;
            } else {
                state.active = true;
                state.id = action.payload.id;
                state.calledBy = action.payload.calledBy;
            }
        },
    },
});

export default dropdownSlice.reducer;
export const { dropdown } = dropdownSlice.actions;
