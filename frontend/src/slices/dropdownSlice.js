import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    isOpen: false,
}

export const dropdownSlice = createSlice({
    name: "dropdown",
    initialState,
    reducers: {

        toggleDropdown: (state, action) => {
//             const { id, isOpen } = action.payload;
//             if (state.id === id && isOpen) {
//                 return;
//             }
//             else {
//                 state.id = id;
//                 state.isOpen = isOpen;
//             }
//             // return isOpen ? id : null;
//             // state.id = id;
//             // state.isOpen = isOpen;
//             // console.log(id, isOpen)
        },

    }
});

export const { toggleDropdown } = dropdownSlice.actions;
export default dropdownSlice.reducer;