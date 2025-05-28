import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const channelApi = createApi({
    reducerPath: 'channelsApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '/api/v1' ,
        prepareHeaders: (headers) => {
            const stored = localStorage.getItem('userId');
            const userId = stored ? JSON.parse(stored) : null;
            if (userId?.token) {
              headers.set('Authorization', `Bearer ${userId.token}`);
            }
            return headers;
          },
        }),
    endpoints: builder => ({
        getChannels: builder.query({
          query: () => 'channels',
        }),
        addNewChannel: builder.mutation({
          query: (channel) => ({
            url: 'channels',
            method: 'POST',
            body: channel,
          }),
        }),
        updateChannel: builder.mutation({
          query: (channel) => ({
            url: `channels/${channel.id}`,
             method: 'PATCH',
            body: channel,
          }),
        }),
        removeChannel: builder.mutation({
          query: (id) => ({
            url: `channels/${id}`,
            method: 'DELETE',
          }),
        }),
      }),     
})

export const { useGetChannelsQuery, useAddNewChannelMutation, useUpdateChannelMutation, useRemoveChannelMutation } = channelApi