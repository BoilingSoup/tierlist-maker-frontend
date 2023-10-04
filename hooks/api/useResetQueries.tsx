import { QueryKey, ResetOptions, ResetQueryFilters, useQueryClient } from "react-query";

export const useResetQueries = () => {
  const queryClient = useQueryClient();

  return (key: QueryKey, filters?: ResetQueryFilters, options?: ResetOptions) =>
    queryClient.resetQueries(key, filters, options);
};
