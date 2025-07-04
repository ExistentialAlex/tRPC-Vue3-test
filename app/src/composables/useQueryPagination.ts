import { useQuery } from '@tanstack/vue-query';
import { ref, computed, watch } from 'vue';

/**
 * useQueryPagination composable
 *
 * A generic composable for paginated API queries using @tanstack/vue-query.
 *
 * @template T - The type of the paginated data items.
 * @param queryKey - Unique key for the query (array or string).
 * @param queryFn - Async function that returns paginated data (should accept an object with { page, limit, search, sort }).
 * @param options - Optional vue-query options.
 * @example
 * Usage:
 *
 * const {
 *   page, limit, search, sort, data, status, error, isFetching, refetch, setPage, setLimit, setSearch, setSort
 * } = useQueryPagination(
 *   ['users'],
 *   ({ page, limit, search, sort }) => api.getUsers({ page, limit, search, sort }),
 *   { keepPreviousData: true }
 * );
 */
export function useQueryPagination<T>(
  queryKey: any[],
  queryFn: (params: { page: number; limit: number; search: string; sort: any }) => Promise<T>,
  options: Record<string, any> = {}
) {
  const page = ref(1);
  const limit = ref(25);
  const search = ref('');
  const sort = ref<any>([]);
  const limitItems = [1, 5, 10, 25, 50];
  const pagination = computed(() => ({
    pageIndex: page.value - 1,
    pageSize: limit.value,
  }));

  const queryParams = computed(() => ({
    page: page.value,
    limit: limit.value,
    search: search.value,
    sort: sort.value,
  }));

  const { data, status, error, isFetching, refetch, isPending, isSuccess } = useQuery({
    queryKey: computed(() => [...queryKey, queryParams.value]),
    queryFn: () => queryFn(queryParams.value),
    ...options,
  });

  // Reset page to 1 when search or sort changes
  watch([search, sort, limit], () => {
    page.value = 1;
  });

  return {
    page,
    limit,
    search,
    sort,
    data,
    status,
    error,
    isFetching,
    refetch,
    isPending,
    isSuccess,
    limitItems,
    pagination,
  };
}
