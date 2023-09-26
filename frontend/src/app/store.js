import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import { crudApi } from "../services/crudApi";
import todoInputSlice from "../slices/todoInputSlice";
import dropdownSlice from "../slices/dropdownSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        todoInput: todoInputSlice,
        dropdown: dropdownSlice,
        [crudApi.reducerPath]: crudApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),

});