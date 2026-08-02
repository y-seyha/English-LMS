import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useNotes(lessonId: string) {
  return useQuery({
    queryKey: ['notes', lessonId],
    queryFn: () => apiClient.get('/notes', { params: { lessonId } }).then(r => r.data),
    enabled: !!lessonId,
  });
}

export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { lessonId: string; content: string }) =>
      apiClient.post('/notes', data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
}

export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      apiClient.put(`/notes/${id}`, { content }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/notes/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] }),
  });
}
