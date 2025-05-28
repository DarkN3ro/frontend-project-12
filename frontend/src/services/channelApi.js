import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes'

export const channelApi = createApi({
    reducerPath: 'channelsApi',
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
    endpoints: (builder) => ({
        getChannels: builder.query({
          query: () => apiRoutes.channelsPath(),
        }),

      }),     
})

export const { useGetChannelsQuery} = channelApi