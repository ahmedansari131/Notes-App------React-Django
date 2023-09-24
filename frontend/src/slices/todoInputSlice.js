import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoDescInput: false,
    todoTitleInput: false,
    todoInputFocus: false,
}

export const todoInputSlice = createSlice({
    name: "todoInput",
    initialState,
    reducers: {

        setTodoTitleInputActive: (state, action) => {
            state.todoTitleInput = action.payload;
        },

        setTodoDescInputActive: (state, action) => {
            state.todoDescInput = action.payload;
        },

        setTodoInputFocus: (state, action) => {
            state.todoInputFocus = action.payload;
        }

    }
});

export const { setTodoTitleInputActive, setTodoDescInputActive, setTodoInputFocus } = todoInputSlice.actions;
export default todoInputSlice.reducer;