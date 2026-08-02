import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useReviewItems(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['review', params],
    queryFn: () => apiClient.get('/review', { params }).then(r => r.data),
    refetchInterval: 10000,
  });
}

export function useCompleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.post(`/review/${id}/complete`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['review'] }),
  });
}
