import type z from "zod";

import type { profileFormSchema } from "../schemas/profile.schema";

export type Designation = {
    id: string;
    name: string;
    code: string;
};

export type Profile = {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    employeeId: string | null;
    mobileNumber: string | null;
    designationId: string | null;
    dateOfBirth: string | null;
    homeAddress: string | null;
    designation: Designation | null;
};

export type UpdateProfilePayload = {
    name?: string;
    mobileNumber?: string;
    designationId?: string | null;
    dateOfBirth?: string | null;
    homeAddress?: string | null;
};

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type DirtyFields = Array<
    "name" | "mobileNumber" | "designationId" | "dateOfBirth" | "homeAddress"
>;
