import { z } from 'zod';

export const PaginateSchema = z.object({
  page: z.coerce.number(),
  limit: z.coerce.number(),
  search: z.string().optional(),
  sort: z.string().optional(),
});
export type PaginateSchema = z.infer<typeof PaginateSchema>;
