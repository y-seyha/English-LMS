import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useStories(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['stories', 'list', params],
    queryFn: () => apiClient.get('/stories', { params }).then(r => r.data),
    staleTime: 30_000,
  });
}

export function useStory(id: string) {
  return useQuery({
    queryKey: ['stories', id],
    queryFn: () => apiClient.get(`/stories/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useCreateStory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/stories', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['stories'] }),
  });
}

export function useUpdateStory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      apiClient.put(`/stories/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['stories'] }),
  });
}

export function useDeleteStory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/stories/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['stories'] }),
  });
}
