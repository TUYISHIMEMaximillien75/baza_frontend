import { apiClient } from '../lib/axios';
import { SessionUser } from '../store';

export interface DashboardStats {
  total: number;
  approved: number;
  pending: number;
  sold: number;
}

const usersService = {
  async getMe(): Promise<SessionUser> {
    const res = await apiClient.get<{ data: SessionUser }>('/users/me');
    return res.data.data;
  },

  async updateMe(dto: Partial<Pick<SessionUser, 'firstName' | 'lastName' | 'phoneNumber' | 'profileImageUrl'>>): Promise<SessionUser> {
    const res = await apiClient.patch<{ data: SessionUser }>('/users/me', dto);
    return res.data.data;
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const res = await apiClient.get<{ data: DashboardStats }>('/users/me/stats');
    return res.data.data;
  },
};

export default usersService;
