import apiClient from './api-client';

export const fetchCollectionsUsingGet = (body) => {
  return apiClient.get(`/users/3/collections`);
};