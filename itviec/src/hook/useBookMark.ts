import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

type FetchFunction<T> = () => Promise<T>;

export function useFetchQuery<T>(
  queryKey: QueryKey,
  fetcher: FetchFunction<T>,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey,
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    ...options,
  });
}
