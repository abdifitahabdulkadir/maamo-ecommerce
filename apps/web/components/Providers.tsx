"use client";

import { PacerProvider } from "@tanstack/react-pacer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <PacerProvider>{children}</PacerProvider>
    </QueryClientProvider>
  );
}
