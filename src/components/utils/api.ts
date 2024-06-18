import axios, { AxiosInstance } from 'axios';

const apiClient = (token: string | null): AxiosInstance => {
  return axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default apiClient;