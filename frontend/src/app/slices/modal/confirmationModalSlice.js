import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: false,
}

const confirmationModalSlice = createSlice({
    name: "ConfirmationModal",
    initialState,
    reducers: {
        getModalStatus: (state, actions) => {
            state.isActive = actions.payload;
        }
    }
});

export default confirmationModalSlice.reducer;
export const {getModalStatus} = confirmationModalSlice.actions;