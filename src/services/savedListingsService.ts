import { apiClient } from '../lib/axios';
import { ListingItem } from '../types';

export interface SavedListingItem extends ListingItem {
  savedId: string;
  savedAt: string;
}

const savedListingsService = {
  async getAll(): Promise<SavedListingItem[]> {
    const res = await apiClient.get<{ data: SavedListingItem[] }>('/saved-listings');
    return res.data.data;
  },

  async getSavedIds(): Promise<string[]> {
    const res = await apiClient.get<{ data: string[] }>('/saved-listings/ids');
    return res.data.data;
  },

  async save(listingId: string): Promise<{ saved: boolean; listingId: string }> {
    const res = await apiClient.post<{ data: { saved: boolean; listingId: string } }>(`/saved-listings/${listingId}`);
    return res.data.data;
  },

  async unsave(listingId: string): Promise<{ saved: boolean; listingId: string }> {
    const res = await apiClient.delete<{ data: { saved: boolean; listingId: string } }>(`/saved-listings/${listingId}`);
    return res.data.data;
  },
};

export default savedListingsService;
