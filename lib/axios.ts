import axios from 'axios';
import { useAuthStore } from '@/store/auth-store';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,

  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    let token = useAuthStore.getState().accessToken;
    if (!token && typeof window !== 'undefined') {
      token = localStorage.getItem('accessToken');
    }

    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },


  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized');
    }

    return Promise.reject(error);
  }
);