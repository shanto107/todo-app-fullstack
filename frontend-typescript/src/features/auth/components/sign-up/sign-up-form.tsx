import { useNavigate } from "react-router";
import { toast } from "sonner";

import { useAppForm } from "@/components/common/form/hooks";
import { authClient } from "@/services/auth-client";

import {
    EMAIL_VERIFICATION_COOLDOWN_SECONDS,
    PENDING_VERIFICATION_EMAIL_KEY,
    VERIFICATION_RESEND_AFTER_KEY,
} from "../../constants/email-verification";
import { signUpSchema } from "../../schemas/sign-up-schema";

export default function SignUpForm() {
    const navigate = useNavigate();

    const form = useAppForm({
        defaultValues: {
            name: "",
            email: "",
            employeeId: "",
            mobileNumber: "",
            password: "",
        },

        validators: {
            onSubmit: signUpSchema,
        },

        onSubmit: async ({ value }) => {
            const { error } = await authClient.signUp.email({
                ...value,
                callbackURL: `${window.location.origin}/verify-email?verified=1`,
            });
            if (error) {
                toast.error("Account creation failed.", {
                    description: error.message,
                });
                return;
            }
            sessionStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, value.email);
            const cooldownUntil =
                Date.now() + EMAIL_VERIFICATION_COOLDOWN_SECONDS * 1000;
            sessionStorage.setItem(
                VERIFICATION_RESEND_AFTER_KEY,
                String(cooldownUntil),
            );
            toast.success("Account created successfully!", {
                description: "Please check your email to verify your account.",
            });
            navigate("/verify-email", {
                replace: true,
                state: { email: value.email },
            });
        },
    });

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
            }}
        >
            <div className="space-y-4">
                <form.AppField name="name">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Full name"
                            placeholder="Enter your full name"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="email">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Email"
                            placeholder="you@example.com"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="employeeId">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Employee ID"
                            placeholder="Enter your 5-digit employee ID"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="mobileNumber">
                    {(field) => (
                        <field.Input
                            variant="default"
                            label="Mobile number"
                            placeholder="01XXXXXXXXX"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>

                <form.AppField name="password">
                    {(field) => (
                        <field.PasswordInput
                            label="Password"
                            placeholder="Create a password"
                            className="rounded-sm text-sm tracking-wider md:text-sm"
                            labelClassName="text-sm md:text-sm tracking-wider"
                        />
                    )}
                </form.AppField>
            </div>

            <form.AppForm>
                <form.AuthSubmitButton
                    label="Create Account"
                    loadingLabel="Creating your account"
                    className="bg-accent/80 dark:bg-chart-4 mt-6 h-9 w-full rounded-md text-sm font-semibold"
                />
            </form.AppForm>
        </form>
    );
}
