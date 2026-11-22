import type { ProfileFormValues } from "../types/profile.types";

export const PROFILE_EDITABLE_FIELDS = [
    "name",
    "mobileNumber",
    "designationId",
    "dateOfBirth",
    "homeAddress",
] as const satisfies readonly (keyof ProfileFormValues)[];
