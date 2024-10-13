import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    id: null,
    parentId: null,
    labelDropdownActive: false,
};

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {
        dropdown: (state, action) => {
            if (action.payload !== null && action.payload.id !== state.id) {
                state.active = true;
                state.id = action.payload.id;
                state.parentId = action.payload.parentId;
            }
            else {
                state.active = false;
                state.id = null;
                state.parentId = null;
            }
        },

        getLabelDropdownStatus: (state, actions) => {
            state.labelDropdownActive = actions.payload;
        }
    },
});

export default dropdownSlice.reducer;
export const { dropdown, getLabelDropdownStatus } = dropdownSlice.actions;
