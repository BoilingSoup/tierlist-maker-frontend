import { QueryKey, RefetchOptions, RefetchQueryFilters, useQueryClient } from "react-query";

export const useRefetchQueries = () => {
  const queryClient = useQueryClient();
  return (key: QueryKey, filters?: RefetchQueryFilters, options?: RefetchOptions) =>
    queryClient.refetchQueries(key, filters, options);
};
