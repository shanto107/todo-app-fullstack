import { z } from "zod";

export const BangladeshPhoneNumberSchema = z
    .string()
    .trim()
    .regex(
        /^(?:\+?8801|01)[3-9]\d{8}$/,
        "Enter a valid mobile number from Bangladesh",
    )
    .transform((phoneNumber) => {
        if (phoneNumber.startsWith("01")) {
            return `+88${phoneNumber}`;
        }
        if (phoneNumber.startsWith("880")) {
            return `+${phoneNumber}`;
        }
        return phoneNumber;
    });

export const signUpSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters.")
        .max(100, "Name is too long."),
    email: z.string().email("Please enter a valid email address."),
    employeeId: z
        .string()
        .regex(/^\d{5}$/, "Employee ID must contain exactly 5 digits."),
    mobileNumber: BangladeshPhoneNumberSchema,
    designationId: z.string().uuid("Please select a valid designation."),
    password: z.string().min(8, "Password must be at least 8 characters."),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
