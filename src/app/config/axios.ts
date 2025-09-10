/* eslint-disable no-console */
import { BaseQueryFn, FetchBaseQueryArgs } from '@reduxjs/toolkit/query';
// import ErrorRedirectService from '@services/ErrorRedirectService';
import axios, { AxiosRequestConfig } from 'axios';
import config from '@config/app';


const configuredAxios = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

configuredAxios.defaults.baseURL = `${config.apiUrl}`;

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const baseQueryBase = (_args: FetchBaseQueryArgs):
BaseQueryFn<AxiosRequestConfig, unknown, unknown> => async (req, { getState, dispatch }) => {
  const state = getState() as any;
  const { accessToken } = state.User;

  if (accessToken) {
    req.headers = {
      ...(req.headers || {}),
      Authorization: `Bearer ${accessToken}`
    };
  }
  try {
    const { data } = await configuredAxios(req);
    return { data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      if (response?.status === 401
        // If not the login url, redirect to initial screen
        && (!response?.config?.url?.endsWith('/login'))) {
        dispatch({ type: 'User/clearUserToken' });
      }
    //   if (response?.status === 404) {
    //     // If 404 status, redirect Not Found Page
    //     ErrorRedirectService.notFoundAccess(true);
    //   }
    }
    return {
      error: {
        status: error?.response?.status,
        response: error?.response
      }
    };
  }
};

const BaseQuery = baseQueryBase({});

export { BaseQuery };

export default configuredAxios;
