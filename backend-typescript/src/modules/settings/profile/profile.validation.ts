import { z } from "zod";

export const BDPhoneNumberSchema = z
    .string()
    .trim()
    .regex(/^(\+8801[3-9]\d{8})$/, "Enter a valid BD mobile number");

export const updateProfileSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(1, "Name is required!")
            .max(100, "Name is too long!")
            .optional(),
        mobileNumber: BDPhoneNumberSchema.optional(),
        designationId: z.uuid().nullable().optional(),
        dateOfBirth: z.iso.date().nullable().optional(),
        homeAddress: z
            .string()
            .trim()
            .max(500, "Home address is too long!")
            .nullable()
            .optional(),
    })
    .refine(
        (profile) =>
            Object.values(profile).some((value) => value !== undefined),
        {
            message: "There's nothing to update!",
            path: ["root"],
        },
    );
