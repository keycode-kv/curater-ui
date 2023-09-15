import apiClient from './api-client';

export const getData = () => {
  return apiClient.get(`/users`);
};