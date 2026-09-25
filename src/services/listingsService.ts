import { apiClient } from '../lib/axios';
import { ListingItem } from '../types';

export interface ListingFilters {
  page?: number;
  limit?: number;
  search?: string;
  categorySlug?: string;
  purpose?: 'SALE' | 'RENT';
  minPrice?: number;
  maxPrice?: number;
  province?: string;
  district?: string;
  sortBy?: 'createdAt' | 'price' | 'publishedAt';
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedListings {
  items: ListingItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CreateListingPayload {
  title: string;
  description: string;
  price: number;
  currency?: string;
  purpose: 'SALE' | 'RENT';
  categoryId: string;
  coverImageUrl?: string;
  province?: string;
  district?: string;
  sector?: string;
}

const listingsService = {
  async getAll(filters?: ListingFilters): Promise<PaginatedListings> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
      });
    }
    const res = await apiClient.get<{ data: PaginatedListings }>(`/listings?${params.toString()}`);
    return res.data.data;
  },

  async getFeatured(limit = 8): Promise<ListingItem[]> {
    const res = await apiClient.get<{ data: ListingItem[] }>(`/listings/featured?limit=${limit}`);
    return res.data.data;
  },

  async getBySlug(slug: string): Promise<ListingItem> {
    const res = await apiClient.get<{ data: ListingItem }>(`/listings/${slug}`);
    return res.data.data;
  },

  async create(payload: CreateListingPayload): Promise<ListingItem> {
    const res = await apiClient.post<{ data: ListingItem }>('/listings', payload);
    return res.data.data;
  },

  async getMyListings(filters?: ListingFilters): Promise<PaginatedListings> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
      });
    }
    const res = await apiClient.get<{ data: PaginatedListings }>(`/listings/me?${params.toString()}`);
    return res.data.data;
  },

  async deleteListing(id: string): Promise<void> {
    await apiClient.delete(`/listings/${id}`);
  },
};

export default listingsService;
