import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { apiPath, apiRoutes } from '../routes/routes.js'

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
        baseQuery: fetchBaseQuery({ 
            baseUrl: '/api/v1',
            prepareHeaders: (headers, { getState }) => {
                const token = getState().auth.token;
                console.log("Token from state:", token); 
                if (token) {
                  headers.set('Authorization', `Bearer ${token}`);
                }
                return headers;
              },
            }),
            tagTypes: ['Messages'],
            endpoints: builder => ({
              getMessages: builder.query({
                query: () => '/messages',
                providesTags: ['Messages'],
              }),
              sendMessage: builder.mutation({
                query: (message) => ({
                  url: '/messages',
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