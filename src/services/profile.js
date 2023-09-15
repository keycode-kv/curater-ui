import apiClient from './api-client';

export const getUser = () => {
  return apiClient.get(`/profile`);
};