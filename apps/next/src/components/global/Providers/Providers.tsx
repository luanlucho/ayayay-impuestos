"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import { CookiesProvider } from "next-client-cookies";
import { ThemeProvider } from "next-themes";
import React, { useState } from "react";

import Props from "./Providers.types";
import { queryClientConfig } from "config/query.config";
import { trpc } from "config/trpc.config";
import { Toaster } from "ui/toaster";
import { TooltipProvider } from "ui/tooltip";
import { getDomainURL } from "utils/common.utils";

const Providers: React.FC<Props> = props => {
  const { children, cookies } = props;
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [httpBatchLink({ url: getDomainURL("/api/trpc") })]
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <CookiesProvider value={cookies}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </CookiesProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
