import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({ 
        baseUrl: '/api/v1' ,
        prepareHeaders: (headers) => {
            const userId = JSON.parse(localStorage.getItem('userId'));
            if (userId?.token) {
              headers.set('Authorization', `Bearer ${userId.token}`);
            }
            return headers;
          },
        }),
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (credentials) => ({
                url: 'signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
