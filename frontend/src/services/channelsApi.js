import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes'

export const channelsApi = createApi({
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
        endpoints: builder => ({
          getChannels: builder.query({
            query: () => apiRoutes.channelsPath(),
          }),
          sendNewChannel: builder.mutation({
            query: channel => ({
              url: apiRoutes.channelsPath(),
              method: 'POST',
              body: channel,
            }),
          }),
          sendUpdateChannel: builder.mutation({
            query: channel => ({
              url: apiRoutes.channelPath(channel.id),
              method: 'PATCH',
              body: channel,
            }),
          }),
          sendRemoveChannel: builder.mutation({
            query: id => ({
              url: apiRoutes.channelPath(id),
              method: 'DELETE',
            }),
          }),
        }),
      })
      
      export const {
        useGetChannelsQuery,
        useSendNewChannelMutation,
        useSendUpdateChannelMutation,
        useSendRemoveChannelMutation,
      } = channelsApi