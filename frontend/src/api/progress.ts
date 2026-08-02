import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';

export function useProgress() {
  return useQuery({
    queryKey: ['progress'],
    queryFn: () => apiClient.get('/progress').then(r => r.data),
  });
}

export function useCompleteLesson() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => apiClient.post(`/progress/lessons/${lessonId}/complete`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useCompleteStory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (storyId: string) => apiClient.post(`/progress/stories/${storyId}/complete`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useCompleteExercises() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, answers }: { lessonId: string; answers: { exerciseId: string; questionText: string; selectedAnswer: string; correctAnswer: string; isCorrect: boolean }[] }) =>
      apiClient.post(`/progress/lessons/${lessonId}/exercises`, { answers }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useCompleteHomework() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, taskIds }: { lessonId: string; taskIds: string[] }) =>
      apiClient.post(`/progress/lessons/${lessonId}/homework`, { taskIds }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useSubmitQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ lessonId, answers }: { lessonId: string; answers: any[] }) =>
      apiClient.post(`/progress/quiz/${lessonId}/attempt`, { answers }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useSubmitStoryQuiz() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ storyId, answers }: { storyId: string; answers: any[] }) =>
      apiClient.post(`/progress/stories/${storyId}/quiz-attempt`, { answers }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}

export function useLearnWord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (wordId: string) => apiClient.post(`/progress/words/${wordId}/learn`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['progress'] }),
  });
}
