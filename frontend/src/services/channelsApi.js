import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import { apiPath, apiRoutes } from '../routes/routes.js'

export const channelsApi = createApi({
    reducerPath: 'channelsApi',
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
        tagTypes: ['Channels'],
        endpoints: builder => ({
          getChannels: builder.query({
            query: () => 'channels',
            providesTags: ['Channels'],
          }),
      })
   })
      export const {
        useGetChannelsQuery,
      } = channelsApi
