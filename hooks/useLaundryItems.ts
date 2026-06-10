import { useQuery } from '@tanstack/react-query';
import { laundryItemService } from '@/services/laundry-item.service';

export function useLaundryItems() {
  return useQuery({
    queryKey: ['laundry-items'],
    queryFn: laundryItemService.getAll,
    staleTime: 1000 * 60 * 30,
  });
}