import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes'

export const authApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiPath,
        prepareHeaders: (headers) => {
            const stored = localStorage.getItem('userId');
            const userId = stored ? JSON.parse(stored) : null;
            if (userId?.token) {
              headers.set('Authorization', `Bearer ${userId.token}`);
            }
            return headers;
          },
        }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: apiRoutes.signupPath(),
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: apiRoutes.loginPath(),
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
