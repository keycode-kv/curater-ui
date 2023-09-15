import apiClient from './api-client';

export const login = (body) => {
  return apiClient.post(`/login`,{...body});
};

export const signUp = (body) => {
    return apiClient.post(`/signup`,{...body});
}