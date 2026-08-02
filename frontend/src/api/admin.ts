import { useQuery } from '@tanstack/react-query';
import apiClient from './client';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => apiClient.get('/admin/dashboard').then(r => r.data),
  });
}

export function useAdminUsers(params?: Record<string, string | number | undefined>) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => apiClient.get('/admin/users', { params }).then(r => r.data),
  });
}

export function useAdminActivity(days = 30) {
  return useQuery({
    queryKey: ['admin', 'activity', days],
    queryFn: () => apiClient.get('/admin/activity', { params: { days } }).then(r => r.data),
  });
}

export function useAdminTopUsers(limit = 10) {
  return useQuery({
    queryKey: ['admin', 'top-users', limit],
    queryFn: () => apiClient.get('/admin/top-users', { params: { limit } }).then(r => r.data),
  });
}

export function useAdminUserAnalytics(userId: string) {
  return useQuery({
    queryKey: ['admin', 'user', userId],
    queryFn: () => apiClient.get(`/admin/user/${userId}`).then(r => r.data),
    enabled: !!userId,
  });
}

export function useAdminReviewItems(params?: Record<string, string | number | undefined>) {
  return useQuery({
    queryKey: ['admin', 'review-items', params],
    queryFn: () => apiClient.get('/admin/review-items', { params }).then(r => r.data),
    refetchInterval: 10000,
  });
}
