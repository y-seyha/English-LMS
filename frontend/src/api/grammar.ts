import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useGrammarUnits() {
  return useQuery({
    queryKey: ['grammar', 'units'],
    queryFn: () => apiClient.get('/grammar/units').then(r => r.data),
  });
}

export function useGrammarUnit(id: string) {
  return useQuery({
    queryKey: ['grammar', 'unit', id],
    queryFn: () => apiClient.get(`/grammar/units/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useGrammarLessons(params?: Record<string, string | number>) {
  return useQuery({
    queryKey: ['grammar', 'lessons', params],
    queryFn: () => apiClient.get('/grammar/lessons', { params }).then(r => r.data),
  });
}

export function useGrammarLesson(id: string) {
  return useQuery({
    queryKey: ['grammar', 'lesson', id],
    queryFn: () => apiClient.get(`/grammar/lessons/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useCreateLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => apiClient.post('/grammar/lessons', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['grammar'] }),
  });
}

export function useUpdateLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      apiClient.put(`/grammar/lessons/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['grammar'] }),
  });
}

export function useDeleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/grammar/lessons/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['grammar'] }),
  });
}
