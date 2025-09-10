import { createApi } from '@reduxjs/toolkit/query/react';

import { BaseQuery } from '@config/axios';

const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: BaseQuery,
  tagTypes: [ 'User' as const ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        data: {
          ...data
        }
      })
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
    }),

    signUp: builder.mutation({
      query: data => ({
        url: '/auth/register',
        method: 'POST',
        data: {
          ...data
        }
      })
    }),

    getUser: builder.query<any, void>({
      query: () => ({
        url: 'auth/me'
      })
    })
  })
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useGetUserQuery,
  useLazyGetUserQuery
} = UserApi;

export default UserApi;
