import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../lib/query-client';
import categoriesService from '../services/categoriesService';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => categoriesService.getAll(),
    staleTime: 1000 * 60 * 10, // categories rarely change — 10 min cache
  });
}
