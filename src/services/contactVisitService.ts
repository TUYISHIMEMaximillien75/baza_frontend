import { apiClient } from '../lib/axios';

export interface CreateVisitRequestPayload {
  listingId: string;
  preferredDate: string; // 'YYYY-MM-DD'
  preferredTime?: string;
  message?: string;
}

export interface CreateContactRequestPayload {
  listingId: string;
  name: string;
  phoneNumber: string;
  email?: string;
  message: string;
}

const visitRequestsService = {
  async create(payload: CreateVisitRequestPayload) {
    const res = await apiClient.post('/visit-requests', payload);
    return res.data.data;
  },

  async getMine() {
    const res = await apiClient.get('/visit-requests/me');
    return res.data.data;
  },

  async getReceived() {
    const res = await apiClient.get('/visit-requests/received');
    return res.data.data;
  },

  async updateStatus(id: string, status: 'ACCEPTED' | 'REJECTED' | 'CANCELLED') {
    const res = await apiClient.patch(`/visit-requests/${id}/status`, { status });
    return res.data.data;
  },
};

const contactRequestsService = {
  async create(payload: CreateContactRequestPayload) {
    const res = await apiClient.post('/contact-requests', payload);
    return res.data.data;
  },

  async getReceived() {
    const res = await apiClient.get('/contact-requests/received');
    return res.data.data;
  },
};

export { visitRequestsService, contactRequestsService };
