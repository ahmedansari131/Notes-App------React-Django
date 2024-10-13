import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    message: null,
}

const snackbarSlice = createSlice({
    name: "snackbar",
    initialState,
    reducers: {
        toggleSnackbar: (state, actions) => {
            state.active = actions.payload.status;
            state.message = actions.payload.message;
        },
    }
});

export default snackbarSlice.reducer;
export const { toggleSnackbar } = snackbarSlice.actions;