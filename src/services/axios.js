import axios from 'axios';
import urlJoin from 'url-join';

import { API_PROXY_URL } from 'config';

const apiAxios = axios.create({
  baseURL: API_PROXY_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const setupAxiosInterceptorsRequest = (axios, accessToken) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const setupAxiosInterceptorsResponse = (axios, errorHandler) => {
  axios.interceptors.response.use((response) => {
    return response.data;
  }, errorHandler);
};

export const composeUrl = (urlData) => {
  if (typeof urlData === 'string') {
    return urlData;
  } else if (Array.isArray(urlData)) {
    return urlJoin(urlData);
  } else {
    console.trace('Incorrect usage of wrapped axios request');
  }
};

export const get = async (url, params) => await apiAxios.get(composeUrl(url), { params });
export const post = async (url, params) => await apiAxios.post(composeUrl(url), params);
export const put = async (url, params) => await apiAxios.put(composeUrl(url), params);
export const del = async (url, params) => await apiAxios.delete(composeUrl(url), { params });
export const patch = async (url, params) => await apiAxios.patch(composeUrl(url), params);

export default apiAxios;
