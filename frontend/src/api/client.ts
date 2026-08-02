import axios from 'axios';
import type { useClerk } from '@clerk/clerk-react';

let clerkInstance: ReturnType<typeof useClerk> | null = null;

export function setClerkInstance(clerk: ReturnType<typeof useClerk>) {
  clerkInstance = clerk;
}

const apiClient = axios.create({
  baseURL: (import.meta as any).env.VITE_API_URL ?? 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config) => {
  if (clerkInstance) {
    const session = clerkInstance.session;
    if (session) {
      const token = await session.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && clerkInstance?.session) {
      window.location.href = '/sign-in';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
