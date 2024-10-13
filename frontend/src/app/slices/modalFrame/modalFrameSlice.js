import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
}

const modalFrameSlice = createSlice({
    name: "modalFrame",
    initialState,
    reducers: {
        frameActiveHandler: (state, actions) => {
            state.active = actions.payload;
        },
    }
});

export default modalFrameSlice.reducer;
export const { frameActiveHandler } = modalFrameSlice.actions;