import { apiClient } from '../lib/axios';

export interface AiSearchResult {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  purpose: string;
  category: string;
  categorySlug: string;
  location: string;
  coverImageUrl: string;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface AiSearchResponse {
  query: string;
  aiExplanation: string;
  parsedFilters: {
    search?: string;
    province?: string;
    district?: string;
    purpose?: string;
    categorySlug?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  results: AiSearchResult[];
}

export const aiSearchService = {
  search: async (query: string): Promise<AiSearchResponse> => {
    const { data } = await apiClient.post('/search/ai', { query });
    // Handle wrapped response from TransformInterceptor
    return data?.data ?? data;
  },
};
