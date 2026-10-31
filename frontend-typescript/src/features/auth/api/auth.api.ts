import { apiFetch } from "@/lib/api/client";

import { ENDPOINTS } from "../constants/auth.endpoints";
import type { Designation } from "../types/auth.types";

export function getDesignations() {
    return apiFetch<Designation[]>(ENDPOINTS.api.signUp.designations);
}
