import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/routes';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
      providesTags: ['Channels'],
    }),
    addChannels: builder.mutation({
      query: (channels) => ({
        url: apiRoutes.channelsPath(),
        method: 'POST',
        body: channels,
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: (channel) => ({
        url: apiRoutes.channelPath(channel.id),
        method: 'PATCH',
        body: { name: channel.name },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: apiRoutes.channelPath(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelsMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
