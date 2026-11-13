import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/services/auth-client";

import { resetPasswordSchema } from "../schemas/forgot-reset-password-schema";
import { useAppForm } from "@/components/common/form/hooks";
import InvalidTokenCard from "../components/reset-password/invalid-token-card";
import SuccessfulResetCard from "../components/reset-password/successful-reset-card";

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const hasInvalidToken = !token || searchParams.has("error");

    const [isReset, setIsReset] = useState(false);

    const form = useAppForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validators: {
            onSubmit: resetPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            if (!token) return;

            try {
                const { error } = await authClient.resetPassword({
                    newPassword: value.newPassword,
                    token,
                });

                if (error) {
                    toast.error("Password reset failed.", {
                        description: error.message,
                    });
                    return;
                }

                setIsReset(true);
                toast.success("Your password has been reset successfully.");
            } catch {
                toast.error("Something went wrong.", {
                    description: "Please try again later.",
                });
            }
        },
    });

    if (hasInvalidToken) {
        return <InvalidTokenCard />;
    }

    if (isReset) {
        return <SuccessfulResetCard />;
    }

    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center text-center">
                    <div className="bg-primary/10 mb-3 flex size-16 items-center justify-center rounded-full">
                        <KeyRound className="text-primary size-8" />
                    </div>

                    <CardTitle className="text-2xl">
                        Create a new password
                    </CardTitle>

                    <CardDescription>
                        Choose a strong password for your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            void form.handleSubmit();
                        }}
                        className="space-y-5"
                    >
                        <form.AppField name="newPassword">
                            {(field) => (
                                <field.PasswordInput
                                    label="New Password"
                                    placeholder="Enter your new password"
                                    className="rounded-sm text-sm tracking-wider md:text-sm"
                                    labelClassName="text-sm md:text-sm tracking-wide"
                                />
                            )}
                        </form.AppField>

                        <form.AppField name="confirmPassword">
                            {(field) => (
                                <field.PasswordInput
                                    label="Confirm Password"
                                    placeholder="Enter your new password"
                                    className="rounded-sm text-sm tracking-wider md:text-sm"
                                    labelClassName="text-sm md:text-sm tracking-wide"
                                />
                            )}
                        </form.AppField>

                        <form.AppForm>
                            <form.AuthSubmitButton
                                label="Reset password"
                                loadingLabel="Resetting password..."
                                className="bg-accent/80 dark:bg-chart-4 mb-2 h-9 w-full rounded-md text-sm"
                            />
                        </form.AppForm>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t pt-5">
                    <Link
                        to="/sign-in"
                        className="flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="size-4" />
                        Back to sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
