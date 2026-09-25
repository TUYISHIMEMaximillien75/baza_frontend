import { useQuery } from '@tanstack/react-query';
import { healthService } from '../services/healthService';
import { queryKeys } from '../lib/query-client';

export function useHealth() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: healthService.getHealth,
    refetchInterval: 30000, // refresh health status every 30s
    retry: 1,
  });
}
