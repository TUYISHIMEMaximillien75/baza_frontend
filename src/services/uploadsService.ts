import { apiClient } from '../lib/axios';

export interface UploadedFileResponse {
  url: string;
  filename: string;
  size: number;
}

export const uploadsService = {
  /**
   * Upload a single image file
   */
  async uploadSingle(file: File): Promise<UploadedFileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await apiClient.post<{ data: UploadedFileResponse }>('/uploads/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.data;
  },

  /**
   * Upload multiple image files (up to 10)
   */
  async uploadMultiple(files: File[]): Promise<UploadedFileResponse[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const res = await apiClient.post<{ data: UploadedFileResponse[] }>('/uploads/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data.data;
  },
};

export default uploadsService;
