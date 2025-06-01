import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes.js'

export const channelsApi = createApi({
    reducerPath: 'channelsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiPath,
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
            query: () => apiRoutes.channelsPath(),
            providesTags: ['Channels'],
          }),
      })
   })
      export const {
        useGetChannelsQuery,
      } = channelsApi
