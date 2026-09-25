import { apiClient } from '../lib/axios';
import { CategoryItem } from '../types';

const categoriesService = {
  async getAll(): Promise<CategoryItem[]> {
    const res = await apiClient.get<{ data: CategoryItem[] }>('/categories');
    return res.data.data;
  },

  async getBySlug(slug: string): Promise<CategoryItem> {
    const res = await apiClient.get<{ data: CategoryItem }>(`/categories/${slug}`);
    return res.data.data;
  },
};

export default categoriesService;
