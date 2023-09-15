import apiClient from './api-client';

export const fetchCollectionsUsingGet = (body) => {
  return apiClient.get(`/users/3/collections`);
};

export const fetchCardById = (cardId) => {
  return apiClient.get(`/cards/${cardId}`);
}

export const archiveCardById = (cardId) => {
  return apiClient.put(`/cards/${cardId}`, {
    status: 'archived',
  });
}

export const saveCardById = (cardId, collectionId) => {
  return apiClient.put(`/cards/${cardId}`, {
    status: 'saved',
    collection_id: collectionId,
  });
}

export const fetchCollections = () => {
  return apiClient.get(`/collections`);
}

export const rateCardById = (contentId, value) => {
  return apiClient.post(`/contents/${contentId}/rating`, {
    rating: value,
  });
}

export const fetchCommentsByContentId = (contentId) => {
  return apiClient.get(`/contents/${contentId}/comments`);
}

export const addCommentByContentId = (contentId, comment) => {
  return apiClient.post(`/contents/${contentId}/comments`, {
    comment,
  });
}