import { QueryClient } from '@tanstack/react-query';

export const QUERY_CLIENT_DEFAULT_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
};

export const queryClient = new QueryClient(QUERY_CLIENT_DEFAULT_OPTIONS);
