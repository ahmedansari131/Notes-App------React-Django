import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todoId: null,
    todoData: [],
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {

        setTodoId: (state, action) => {
            state.todoId = action.payload;
        },

        setTodoData: (state, action) => {
            const todo = {
                title: action.payload["title"],
                description: action.payload["description"],
            }
            state.todoData.push(todo);
        },

    }
});

export const { setTodoId, setTodoData } = todoSlice.actions;
export default todoSlice.reducer;