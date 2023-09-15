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
