import axios from 'axios';
import { getAccessToken } from '../services/MSGraphAuthService';

const apiClient = axios.create({
  baseURL: 'https://localhost:7049/api/',
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
