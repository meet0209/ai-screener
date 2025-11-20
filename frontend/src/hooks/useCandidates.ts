import { useQuery } from '@tanstack/react-query';
import { api } from '../utils/apiClient';

export const useCandidates = (search?: string) =>
  useQuery({
    queryKey: ['candidates', search],
    queryFn: async () => {
      const { data } = await api.get('/candidates', { params: { search } });
      return data;
    },
  });
