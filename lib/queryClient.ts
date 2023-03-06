import { QueryClient } from "react-query";

export const generateQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 120, // 2 hours
        cacheTime: 1000 * 60 * 150, // 2.5 hours
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
};

export const queryClient = generateQueryClient();
