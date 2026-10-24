import { getErrorMessage } from "@/lib/get-error-message";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            retry: 3,
            refetchOnWindowFocus: false
        },
        mutations: {
            onError: (error) => {
                toast.error("Request failed.", {
                    description: getErrorMessage(error)
                })
            }
        }
    }
});