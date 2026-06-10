import { api } from '@/lib/axios';
import { LaundryItem } from '@/types/laundry-item';

export const laundryItemService = {
  async getAll(): Promise<LaundryItem[]> {
    const response = await api.get('/laundry-items');

    return response.data;
  },
};