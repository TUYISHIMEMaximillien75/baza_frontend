import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminService from '../services/adminService';

const KEYS = {
  stats: ['admin', 'stats'] as const,
  pendingVerifications: ['admin', 'verifications', 'pending'] as const,
  pendingListings: ['admin', 'listings', 'pending'] as const,
  users: (params?: any) => ['admin', 'users', params] as const,
};

export function useAdminStats() {
  return useQuery({
    queryKey: KEYS.stats,
    queryFn: () => adminService.getStats(),
  });
}

export function usePendingVerifications(limit = 10) {
  return useQuery({
    queryKey: KEYS.pendingVerifications,
    queryFn: () => adminService.getPendingVerifications(limit),
  });
}

export function usePendingListings(limit = 10) {
  return useQuery({
    queryKey: KEYS.pendingListings,
    queryFn: () => adminService.getPendingListings(limit),
  });
}

export function useVerificationActions() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: KEYS.pendingVerifications });
    qc.invalidateQueries({ queryKey: KEYS.stats });
  };

  const approve = useMutation({
    mutationFn: (id: string) => adminService.approveVerification(id),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      adminService.rejectVerification(id, reason),
    onSuccess: invalidate,
  });

  return {
    approve: approve.mutate,
    reject: reject.mutate,
    isApproving: approve.isPending,
    isRejecting: reject.isPending,
  };
}

export function useListingModerationActions() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: KEYS.pendingListings });
    qc.invalidateQueries({ queryKey: KEYS.stats });
  };

  const approve = useMutation({
    mutationFn: (id: string) => adminService.approveListing(id),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      adminService.rejectListing(id, reason),
    onSuccess: invalidate,
  });

  return {
    approve: approve.mutate,
    reject: reject.mutate,
    isApproving: approve.isPending,
    isRejecting: reject.isPending,
  };
}
