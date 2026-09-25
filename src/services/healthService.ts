import { apiClient } from '../lib/axios';
import { ApiResponse, HealthCheckData } from '../types';

export const healthService = {
  getHealth: async (): Promise<HealthCheckData> => {
    const response = await apiClient.get<ApiResponse<HealthCheckData>>('/health');
    return response.data.data;
  },
};
