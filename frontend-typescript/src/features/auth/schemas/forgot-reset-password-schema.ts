import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Password must contain at least 8 characters.")
            .max(128, "Password must not exceed 128 characters."),
        confirmPassword: z.string(),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });
