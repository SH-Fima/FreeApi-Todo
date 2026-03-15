import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.freeapi.app/api/v1/todos'
    }),

    endpoints: (builder) => ({

        // Add todo
        addTodos: builder.mutation({
            query: (data) => ({
                url: '/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Todos"], 
        }),

        getTodos: builder.query({
            query: () => '/',
            providesTags: ["Todos"],
        }),

        // Delete todo
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                body: { id }
            })
        }),


        updateTodo: builder.mutation({
            query: ({ id, description, title}) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: { title, description },
                headers: {
                    'Content-Type': 'application/json',
                }
            }),
            invalidatesTags: ["Todos"], 
        }),

    })
})

export const {
    useGetTodosQuery,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
    useAddTodosMutation
} = api;

export default api;
