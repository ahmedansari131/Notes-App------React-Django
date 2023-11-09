import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const crudApi = createApi({
    reducerPath: '',
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
    endpoints: (builder) => ({
        getTodoList: builder.query({
            query: () => '/',
        }),

        getNote: builder.query({
            query: (id) => `${id}/`,
        }),

        createTodo: builder.mutation({
            query: (todo) => ({
                url: 'createnote/',
                method: "POST",
                body: todo,
            }),
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `deletetodo/${id}/`,
                method: "DELETE",
            }),
        }),

        updateTodo: builder.mutation({
            query: (inputData) => {
                const { id, ...data } = inputData;
                return {
                    url: `updatetodo/${id}/`,
                    method: "PUT",
                    body: data,
                }
            },
        }),
    }),

})

export const { useGetTodoListQuery, useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation, useGetNoteQuery } = crudApi;