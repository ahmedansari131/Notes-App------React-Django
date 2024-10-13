import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const crudApi = createApi({
  reducerPath: "Notes",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/" }),
  tagTypes: ["note", "label"],
  endpoints: (builder) => ({
    getTodoList: builder.query({
      query: () => "/",
      providesTags: ["note", "label"],
    }),

    getNote: builder.query({
      query: (id) => `${id}/`,
      providesTags: ["note", "label"],
    }),

    createNote: builder.mutation({
      query: (todo) => ({
        url: "createnote/",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["note"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `deletetodo/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["note"],
    }),

    updateNote: builder.mutation({
      query: (inputData) => {
        const { id, labelId, labelStatus, ...data } = inputData;
        return {
          url: `updatenote/${id}/?labelid=${labelId}&&labelstatus=${labelStatus}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["note", "label"],
    }),

    createNoteLabel: builder.mutation({
      query: (data) => {
        return {
          url: `createlabel/`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["label"],
    }),

    getAllNoteLabel: builder.query({
      query: () => {
        return {
          url: `getlabel/`,
          method: "GET",
        };
      },
      providesTags: ["label"],
    }),

    updateNoteLabel: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `updatelabel/${id}/`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["label"],
    }),

    deleteNoteLabel: builder.mutation({
      query: ({ id, ...data }) => {
        return {
          url: `deletelabel/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["label"],
    }),

    uploadNoteImage: builder.mutation({
      query: (data) => {
        const id = data.get("id");
        return {
          url: `uploadnoteimage/${id}/`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["note"],
    }),

    deleteNoteImage: builder.mutation({
      query: (id) => {
        return {
          url: `deletenoteimage/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["note"],
    }),

    register: builder.mutation({
      query: (data) => {
        return {
          url: `register/`,
          method: "POST",
          body: data,
        };
      },
    }),

    login: builder.mutation({
      query: (data) => {
        return {
          url: `login/`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetTodoListQuery,
  useCreateNoteMutation,
  useDeleteTodoMutation,
  useUpdateNoteMutation,
  useGetNoteQuery,
  useCreateNoteLabelMutation,
  useGetAllNoteLabelQuery,
  useUpdateNoteLabelMutation,
  useDeleteNoteLabelMutation,
  useUploadNoteImageMutation,
  useDeleteNoteImageMutation,
  useRegisterMutation,
  useLoginMutation
} = crudApi;

export const selectAllNotes = crudApi.endpoints.getTodoList.select();
export const selectUploadImageStatus =
  crudApi.endpoints.uploadNoteImage.select();
