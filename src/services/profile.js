import apiClient from './api-client';

export const getUser = () => {
  return apiClient.get(`/profile`);
};

export const getConfigMail = () => {
    return apiClient.get(`/configuration`);
  };