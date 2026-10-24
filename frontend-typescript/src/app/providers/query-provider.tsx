import { queryClient } from "@/services/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { PropsWithChildren } from "react";

export function QueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {
                children
            }
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}