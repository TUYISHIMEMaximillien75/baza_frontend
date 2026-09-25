import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import notificationsService from '../services/notificationsService';
import { useSessionStore } from '../store';
import { queryKeys } from '../lib/query-client';

export function useNotifications() {
  const { isAuthenticated } = useSessionStore();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => notificationsService.getAll(),
    enabled: isAuthenticated,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => notificationsService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationsService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });

  return {
    ...query,
    markAsRead: markReadMutation.mutate,
    markAllAsRead: markAllReadMutation.mutate,
    isMarkingAll: markAllReadMutation.isPending,
  };
}
