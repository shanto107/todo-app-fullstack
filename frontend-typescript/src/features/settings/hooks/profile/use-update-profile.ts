import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateProfileSettings } from "../../api/profile.api";
import { profileQueryKeys } from "../preferences/key-factory";

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfileSettings,
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData(profileQueryKeys.me(), updatedProfile);
        },
    });
}
