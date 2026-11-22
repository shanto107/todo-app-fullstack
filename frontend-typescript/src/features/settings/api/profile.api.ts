import { ENDPOINTS } from "@/constants/endpoints";
import { apiFetch } from "@/lib/api/client";

import {
    type Designation,
    type Profile,
    type UpdateProfilePayload,
} from "../types/profile.types";

export function getProfile() {
    return apiFetch<Profile>(ENDPOINTS.api.settings.profile.me);
}

export function updateProfileSettings(payload: UpdateProfilePayload) {
    const options: RequestInit = {
        method: "PATCH",
        body: JSON.stringify(payload),
    };

    return apiFetch<Profile>(ENDPOINTS.api.settings.profile.me, options);
}

export function getDesignations() {
    return apiFetch<Designation[]>(ENDPOINTS.api.settings.profile.designations);
}
