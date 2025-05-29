import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
        baseQuery: fetchBaseQuery({ 
            baseUrl: apiPath,
            prepareHeaders: (headers) => {
                const stored = localStorage.getItem('userId');
                const userId = stored ? JSON.parse(stored) : null;
                if (userId?.token) {
                  headers.set('Authorization', `Bearer ${userId.token}`);
                }
                headers.set('Cache-Control', 'no-cache');
                return headers;
              },
            }),
            endpoints: builder => ({
              getMessages: builder.query({
                query: () => apiRoutes.messagesPath(),
              }),
              sendMessage: builder.mutation({
                query: message => ({
                  url: apiRoutes.messagesPath(),
                  method: 'POST',
                  body: message,
                }),
              }),
            }),
          })
          
          export const {
            useGetMessagesQuery,
            useSendMessageMutation,
          } = messagesApi