import { configureStore } from "@reduxjs/toolkit";
import { crudApi } from "../services/crudApi";
import updateNoteSlice from "./slices/updateNote/updateNoteSlice";
import notesSlice from "./slices/noteData/notesSlice";
import dropdownSlice from "./slices/dropdown/dropdownSlice";

export const store = configureStore({
    reducer: {
        updateNote: updateNoteSlice,
        notes: notesSlice,
        dropdown: dropdownSlice,
        [crudApi.reducerPath]: crudApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),

});