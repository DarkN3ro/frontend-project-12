import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { apiPath, apiRoutes } from '../routes/routes.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("📦 [prepareHeaders] Token from state:", token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: builder => ({

    getMessages: builder.query({
      query: () => {
        console.log("📥 [getMessages] Fetching messages...");
        return 'messages';
      },
      transformResponse: (response) => {
        console.log("✅ [getMessages] Response from server:", response);
        return response; 
      },
      providesTags: ['Messages'],
      onError: (error) => {
        console.error("❌ [getMessages] Error fetching messages:", error);
      }
    }),

    sendMessage: builder.mutation({
      query: (message) => {
        console.log("📤 [sendMessage] Sending message:", message);
        return {
          url: 'messages',
          method: 'POST',
          body: message,
        };
      },
      transformResponse: (response) => {
        console.log("✅ [sendMessage] Server response:", response);
        return response;
      },
      onError: (error) => {
        console.error("❌ [sendMessage] Error sending message:", error);
      },
      invalidatesTags: ['Messages'],
    }),

  }),
});

          
          export const {
            useGetMessagesQuery,
            useSendMessageMutation,
          } = messagesApi