import { useQuery } from "@tanstack/react-query";

import { getDesignations } from "../api/auth.api";
import { authQueryKeys } from "../constants/auth.key-factory";

export function useDesignations() {
    return useQuery({
        queryKey: authQueryKeys.designations(),
        queryFn: getDesignations,
        staleTime: 1000 * 60 * 60,
    });
}
