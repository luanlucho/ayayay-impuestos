import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { createServerSideHelpers } from "@trpc/react-query/server";

import { AppRouter, appRouter } from "trpc";
import { getDomainURL } from "utils/common.utils";

const proxyClient = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: getDomainURL("/api/trpc") })]
});

export const trpcServer = createServerSideHelpers({
  router: appRouter,
  client: proxyClient
});
