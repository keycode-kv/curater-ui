import apiClient from "./api-client";

export const fetchCollectionsUsingGet = () => {
  return apiClient.get(`/collections`);
};

export const fetchCardsListUsingGet = (data) => {
  const params = new URLSearchParams();
  data?.tags?.forEach((t) => {
    params.append("tags", t);
  });
  if (data.search) {
    params.append("search", data.search);
  }
  if (data.type) {
    params.append("type", data.type);
  }
  if (data.collection) {
    params.append("collection", data.collection);
  }
  return apiClient.get(`/cards?${params.toString()}`);
};

export const fetchTagsListUsingGet = () => {
  return apiClient.get(`/tags`);
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
