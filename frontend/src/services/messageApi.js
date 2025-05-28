import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const messageApi = createApi({
    reducerPath: 'messagesApi',
        baseQuery: fetchBaseQuery({ 
            baseUrl: '/api/v1',
            prepareHeaders: (headers) => {
                const stored = localStorage.getItem('userId');
                const userId = stored ? JSON.parse(stored) : null;
                if (userId?.token) {
                  headers.set('Authorization', `Bearer ${userId.token}`);
                }
                return headers;
              },
            }),
        endpoints: (builder) => ({
          getMessages: builder.query({
            query: () => 'messages',
          }),
          sendMessages: builder.mutation({
            query: (message) => ({
              url: 'messages',
              method: 'POST',
              body: message,
            }),
          }),
        }),
    });

    export const { useGetMessagesQuery, useSendMessagesMutation } = messageApi;