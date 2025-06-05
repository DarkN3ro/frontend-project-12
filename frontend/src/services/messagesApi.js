import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiPath, apiRoutes } from '../routes/routes'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Messages'],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => apiRoutes.messagesPath(),
      providesTags: ['Messages'],
    }),
    sendMessage: builder.mutation({
      query: message => ({
        url: apiRoutes.messagesPath(),
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi
