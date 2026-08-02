import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useVocabulary(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['vocabulary', params],
    queryFn: () => apiClient.get('/vocabulary', { params }).then(r => r.data),
  });
}

export function useCreateVocabulary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/vocabulary', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vocabulary'] }),
  });
}

export function useUpdateVocabulary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      apiClient.put(`/vocabulary/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vocabulary'] }),
  });
}

export function useDeleteVocabulary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/vocabulary/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vocabulary'] }),
  });
}
