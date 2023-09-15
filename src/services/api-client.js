
import axios from 'axios';

const qs = require('qs');

const apiClient = axios.create({
  timeout: 120000,
  baseURL: 'http://192.168.2.255:8082',
  withCredentials: false,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

apiClient.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    // // In case of status 401 user will redirect to login page because of token expire
    // if (error?.response?.status === 401) {
    //   router.push('/logout');
    // }
    return Promise.reject(error);
  },
);

export default apiClient;