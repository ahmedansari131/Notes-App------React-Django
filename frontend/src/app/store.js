import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";
import { crudApi } from "../services/crudApi";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        [crudApi.reducerPath]: crudApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),

});