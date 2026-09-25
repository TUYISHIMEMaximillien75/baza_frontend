import { apiClient } from '../lib/axios';
import { NotificationItem } from '../types';

const notificationsService = {
  async getAll(): Promise<NotificationItem[]> {
    const res = await apiClient.get<{ data: NotificationItem[] }>('/notifications');
    return res.data.data;
  },

  async markAsRead(id: string): Promise<NotificationItem> {
    const res = await apiClient.patch<{ data: NotificationItem }>(`/notifications/${id}/read`);
    return res.data.data;
  },

  async markAllAsRead(): Promise<{ updated: number }> {
    const res = await apiClient.patch<{ data: { updated: number } }>('/notifications/read-all');
    return res.data.data;
  },
};

export default notificationsService;
