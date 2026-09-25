import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../lib/query-client';
import listingsService, { ListingFilters } from '../services/listingsService';
import { useSessionStore } from '../store';

export function useListings(filters?: ListingFilters) {
  return useQuery({
    queryKey: queryKeys.listings(filters),
    queryFn: () => listingsService.getAll(filters),
  });
}

export function useFeaturedListings(limit = 8) {
  return useQuery({
    queryKey: [...queryKeys.listings(), 'featured', limit],
    queryFn: () => listingsService.getFeatured(limit),
    staleTime: 1000 * 60 * 5,
  });
}

export function useListingDetail(slug: string) {
  return useQuery({
    queryKey: queryKeys.listingDetail(slug),
    queryFn: () => listingsService.getBySlug(slug),
    enabled: Boolean(slug),
  });
}

export function useMyListings(filters?: ListingFilters) {
  const { isAuthenticated } = useSessionStore();
  return useQuery({
    queryKey: ['listings', 'me', filters],
    queryFn: () => listingsService.getMyListings(filters),
    enabled: isAuthenticated,
  });
}
