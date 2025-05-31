import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/route.js'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
        baseQuery: fetchBaseQuery({ 
            baseUrl: apiPath,
            prepareHeaders: (headers, { getState }) => {
                const token = getState().auth.token;
                if (token) {
                  headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
              },
            }),
            endpoints: builder => ({
              getMessages: builder.query({
                query: () => apiRoutes.messagesPath(),
              }),
              sendMessage: builder.mutation({
                query: (message) => ({
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