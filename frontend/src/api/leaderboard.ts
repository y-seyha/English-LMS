import { useQuery } from '@tanstack/react-query';
import apiClient from './client';

export function useLeaderboard(params?: { limit?: number; sort?: string }) {
  return useQuery({
    queryKey: ['leaderboard', params],
    queryFn: () => apiClient.get('/leaderboard', { params }).then(r => r.data),
  });
}
