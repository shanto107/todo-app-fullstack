import { z } from "zod";

export const signUpSchema = z
    .object({
        name: z.string().trim().min(2, "Name must be at least 2 characters."),
        email: z.string().email("Please enter a valid email address."),
        password: z.string().min(8, "Password must be at least 8 characters."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
