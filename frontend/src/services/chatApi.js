import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js';

export const chatApi = createApi({
  reducerPath: 'chatApi',
  tagTypes: ['Channels', 'Messages'],
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().authReducer

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    // login and signup
    signup: builder.mutation({
      query: user => ({
        url: apiRoutes.signupPath(),
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: user => ({
        url: apiRoutes.loginPath(),
        method: 'POST',
        body: user,
      }),
    }),
    //channels and messages
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
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
      providesTags: ['Channels'],
    }),
  }),
})

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetChannelsQuery,
} = chatApi
