import { useQuery } from '@tanstack/react-query';
import usersService from '../services/usersService';
import { useSessionStore } from '../store';

export function useCurrentUser() {
  const { isAuthenticated } = useSessionStore();

  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => usersService.getMe(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });
}

export function useDashboardStats() {
  const { isAuthenticated } = useSessionStore();

  return useQuery({
    queryKey: ['users', 'me', 'stats'],
    queryFn: () => usersService.getDashboardStats(),
    enabled: isAuthenticated,
  });
}
