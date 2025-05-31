import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/route.js';

const baseQuery = fetchBaseQuery({
  baseUrl: apiPath,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // редирект на /login при ошибке 401
    window.location.href = '/login';
  }
  return result;
};

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithRedirect,
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
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi;