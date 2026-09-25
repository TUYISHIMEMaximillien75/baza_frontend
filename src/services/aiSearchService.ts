import { apiClient } from '../lib/axios';

export interface AiSearchResult {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  purpose: string;
  status: string;
  category: string;
  categorySlug: string;
  location: string;
  locationShort: string;
  coverImageUrl: string;
  isFeatured: boolean;
  isVerified: boolean;
  ownerName: string;
  createdAt: string;
  publishedAt: string | null;
}

export interface AiSearchResponse {
  query: string;
  aiExplanation: string;
  appliedStrategy: string;
  totalFound: number;
  parsedFilters: {
    categorySlug?: string;
    purpose?: string;
    province?: string;
    district?: string;
    sector?: string;
    minPrice?: number;
    maxPrice?: number;
    minRooms?: number;
  };
  results: AiSearchResult[];
}

export const aiSearchService = {
  search: async (query: string): Promise<AiSearchResponse> => {
    const { data } = await apiClient.post('/search/ai', { query });
    // Handle NestJS TransformInterceptor wrapper
    return data?.data ?? data;
  },
};
