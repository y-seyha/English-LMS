import { useQuery } from '@tanstack/react-query';
import apiClient from './client';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => apiClient.get('/users/me').then(r => r.data),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });
}
