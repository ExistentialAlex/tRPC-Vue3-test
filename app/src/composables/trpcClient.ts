import { createTRPCProxyClient } from '@trpc/client';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import type { AppRouter } from '../../../server/src/routers';

const url = import.meta.env.VITE_TRPC_URL;

export const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url })],
});
