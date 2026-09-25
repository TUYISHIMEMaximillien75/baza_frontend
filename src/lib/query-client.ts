import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const queryKeys = {
  health: ['health'] as const,
  user: (id: string) => ['users', id] as const,
  listings: (filters?: Record<string, any>) => ['listings', filters] as const,
  listingDetail: (slug: string) => ['listings', 'detail', slug] as const,
  categories: ['categories'] as const,
  locations: ['locations'] as const,
  notifications: ['notifications'] as const,
};
