import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSessionStore } from '../store';
import savedListingsService from '../services/savedListingsService';
import { queryKeys } from '../lib/query-client';

const SAVED_IDS_KEY = ['saved-listings', 'ids'];
const SAVED_ALL_KEY = ['saved-listings', 'all'];

export function useSavedIds() {
  const { isAuthenticated } = useSessionStore();
  return useQuery({
    queryKey: SAVED_IDS_KEY,
    queryFn: () => savedListingsService.getSavedIds(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    initialData: [] as string[],
  });
}

export function useSavedListings() {
  const { isAuthenticated } = useSessionStore();
  return useQuery({
    queryKey: SAVED_ALL_KEY,
    queryFn: () => savedListingsService.getAll(),
    enabled: isAuthenticated,
  });
}

export function useToggleSave(listingId: string) {
  const queryClient = useQueryClient();
  const { data: savedIds = [] } = useSavedIds();
  const isSaved = savedIds.includes(listingId);

  const mutation = useMutation({
    mutationFn: () => isSaved
      ? savedListingsService.unsave(listingId)
      : savedListingsService.save(listingId),
    onMutate: async () => {
      // Optimistically update saved IDs
      await queryClient.cancelQueries({ queryKey: SAVED_IDS_KEY });
      const prevIds = queryClient.getQueryData<string[]>(SAVED_IDS_KEY) ?? [];
      const newIds = isSaved ? prevIds.filter((id) => id !== listingId) : [...prevIds, listingId];
      queryClient.setQueryData(SAVED_IDS_KEY, newIds);
      return { prevIds };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevIds) {
        queryClient.setQueryData(SAVED_IDS_KEY, context.prevIds);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_IDS_KEY });
      queryClient.invalidateQueries({ queryKey: SAVED_ALL_KEY });
    },
  });

  return { isSaved, toggle: mutation.mutate, isLoading: mutation.isPending };
}
