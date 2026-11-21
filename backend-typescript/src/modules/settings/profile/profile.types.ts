import { Response } from "express";
import z from "zod";

import { AuthenticatedLocals, TypedRequest } from "#src/types/http.types.js";

import { updateProfileSchema } from "./profile.validation.js";

export type UpdateProfileBody = z.infer<typeof updateProfileSchema>;
export type UpdateProfilePayload = Omit<UpdateProfileBody, "dateOfBirth"> & {
    dateOfBirth?: Date | null;
};

export type GetProfileRequest = TypedRequest<Record<string, never>>;
export type AuthenticatedProfileResponse = Response<
    unknown,
    AuthenticatedLocals
>;
export type UpdateProfileRequest = TypedRequest<
    Record<string, never>,
    UpdateProfileBody
>;
