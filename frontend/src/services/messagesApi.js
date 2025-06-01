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
                query: () => 'messages',
                transformResponse: (response) => {
                  console.log('Raw API response:', response);
                  // Преобразуем channelId -> channelName, если каналы уже в Redux
                  return response.map((msg) => ({
                    ...msg,
                    channel: msg.channelId, // <-- временно присваиваем для работы фильтрации
                  }));
                },
                providesTags: ['Messages'],
              }),
              sendMessage: builder.mutation({
                query: (message) => ({
                  url: 'messages',
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