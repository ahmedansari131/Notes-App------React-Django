import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: [
                    {
                        title: action.payload.title,
                        description: action.payload.desc,
                    }
                ]
            }
            state.todos.push(todo);
            console.log(todo.text)
        },

        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
            console.log(state.todos)

        },

        updateTodo: (state, action) => {
            state.todos.map((item) => {
                if (item.id === action.payload[1]) {
                    item.text = action.payload[0];
                }
            });
        },
    }
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;