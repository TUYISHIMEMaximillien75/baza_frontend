import { apiClient } from '../lib/axios';

export interface PlatformStats {
  totalUsers: number;
  totalListings: number;
  pendingListings: number;
  pendingVerifications: number;
}

export interface PendingVerification {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  verificationType: string;
  status: string;
  submittedAt: string | null;
}

export interface PendingListing {
  id: string;
  title: string;
  slug: string;
  category: string;
  ownerName: string;
  price: number;
  currency: string;
  status: string;
  createdAt: string | null;
}

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  emailVerified: boolean;
  roles: string[];
  createdAt: string | null;
  lastLoginAt: string | null;
}

const adminService = {
  async getStats(): Promise<PlatformStats> {
    const res = await apiClient.get<{ data: PlatformStats }>('/admin/stats');
    return res.data.data;
  },

  async getPendingVerifications(limit = 10): Promise<PendingVerification[]> {
    const res = await apiClient.get<{ data: PendingVerification[] }>(
      `/admin/verifications/pending?limit=${limit}`,
    );
    return res.data.data;
  },

  async approveVerification(id: string): Promise<void> {
    await apiClient.patch(`/admin/verifications/${id}/approve`);
  },

  async rejectVerification(id: string, reason?: string): Promise<void> {
    await apiClient.patch(`/admin/verifications/${id}/reject`, { reason });
  },

  async getPendingListings(limit = 10): Promise<PendingListing[]> {
    const res = await apiClient.get<{ data: PendingListing[] }>(
      `/admin/listings/pending?limit=${limit}`,
    );
    return res.data.data;
  },

  async approveListing(id: string): Promise<void> {
    await apiClient.patch(`/admin/listings/${id}/approve`);
  },

  async rejectListing(id: string, reason?: string): Promise<void> {
    await apiClient.patch(`/admin/listings/${id}/reject`, { reason });
  },

  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const qp = new URLSearchParams();
    if (params?.page) qp.set('page', String(params.page));
    if (params?.limit) qp.set('limit', String(params.limit));
    if (params?.search) qp.set('search', params.search);
    const res = await apiClient.get<{ data: { items: AdminUser[]; meta: any } }>(
      `/admin/users?${qp.toString()}`,
    );
    return res.data.data;
  },
};

export default adminService;
