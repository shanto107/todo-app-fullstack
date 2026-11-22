import { useQuery } from "@tanstack/react-query";

import { getDesignations } from "../../api/profile.api";
import { profileQueryKeys } from "../preferences/key-factory";

export function useDesignations() {
    return useQuery({
        queryKey: profileQueryKeys.designations(),
        queryFn: getDesignations,
        staleTime: 1000 * 60 * 10,
    });
}
