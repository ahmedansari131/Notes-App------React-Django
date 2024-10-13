import { configureStore } from "@reduxjs/toolkit";
import { crudApi } from "../services/crudApi";
import { snackbarSlice, modalFrameSlice, confirmationModalSlice, dropdownSlice, labelSlice, notesSlice } from "./index"

export const store = configureStore({
    reducer: {
        notes: notesSlice,
        dropdown: dropdownSlice,
        noteLabel: labelSlice,
        confirmationModal: confirmationModalSlice,
        modalFrame: modalFrameSlice,
        snackbar: snackbarSlice,
        [crudApi.reducerPath]: crudApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),

});