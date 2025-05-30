import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPath, apiRoutes } from '../routes/route';

export const authApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiPath,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
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