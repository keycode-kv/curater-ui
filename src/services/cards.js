import apiClient from './api-client';

export const fetchCollectionsUsingGet = (body) => {
  return apiClient.get(`/users/3/collections`);
};

export const fetchCardById = (cardId) => {
  return apiClient.get(`/cards/${cardId}`);
}