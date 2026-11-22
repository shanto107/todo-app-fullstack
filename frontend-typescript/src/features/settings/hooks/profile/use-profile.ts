import { useQuery } from "@tanstack/react-query";

import { getProfile } from "../../api/profile.api";
import { profileQueryKeys } from "../preferences/key-factory";

export function useProfile() {
    return useQuery({
        queryKey: profileQueryKeys.me(),
        queryFn: getProfile,
    });
}
