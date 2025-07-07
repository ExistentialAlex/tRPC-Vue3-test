import type { ColumnSort, PaginationResult } from 'adfinity-ui-types';
export declare const paginate: <T>(dataset: T[], page: number, limit?: number, search?: string, sort?: ColumnSort[]) => PaginationResult<T>;
