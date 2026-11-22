import { z } from "zod";

export const BDPhoneNumberSchema = z
    .string()
    .trim()
    .refine(
        (value) => value === "" || /^\+8801[3-9]\d{8}$/.test(value),
        "Enter a valid BD mobile number",
    );

export const profileFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required!")
        .max(100, "Name is too long!"),

    mobileNumber: BDPhoneNumberSchema,
    designationId: z.string(),
    dateOfBirth: z.date().optional(),
    homeAddress: z.string().trim().max(500, "Home address is too long!"),
});
