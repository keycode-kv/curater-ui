
import axios from 'axios';
import {router} from '../index';
const qs = require('qs');

const apiClient = axios.create({
  timeout: 120000,
  baseURL: 'https://cbed-103-214-233-88.ngrok-free.app',
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

apiClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `${localStorage.getItem('auth_token') ?? ''}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    // // In case of status 401 user will redirect to login page because of token expire
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth_token');
      router.navigate('/login');
     }
    return Promise.reject(error);
  },
);

export default apiClient;