import { ArrowLeft, KeyRoundIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/services/auth-client";
import { toast } from "sonner";
import { useAppForm } from "@/components/common/form/hooks";
import { forgotPasswordSchema } from "../schemas/forgot-reset-password-schema";
import EmailSubmittedCard from "../components/forgot-password/Email-Submitted-Card";

export default function ForgotPasswordPage() {
    const [submittedEmail, setSubmittedEmail] = useState("");

    const form = useAppForm({
        defaultValues: {
            email: "",
        },
        validators: {
            onSubmit: forgotPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                const { error } = await authClient.requestPasswordReset({
                    email: value.email,
                    redirectTo: `${window.location.origin}/reset-password`,
                });
                if (error) {
                    toast.error("Unable to process your request.", {
                        description: error.message,
                    });
                    return;
                }
                setSubmittedEmail(value.email);
            } catch {
                toast.error("Something went wrong.", {
                    description: "Please try again later.",
                });
            }
        },
    });

    if (submittedEmail) {
        return (
            <EmailSubmittedCard
                submittedEmail={submittedEmail}
                setSubmittedEmail={setSubmittedEmail}
            />
        );
    }

    return (
        <div className="relative flex w-full items-center justify-center">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center space-y-2 text-center">
                    <div className="bg-primary/10 mb-3 flex size-16 items-center justify-center rounded-full">
                        <KeyRoundIcon className="text-primary/80 dark:text-chart-2 size-8" />
                    </div>

                    <CardTitle className="text-2xl">Forgot password?</CardTitle>

                    <CardDescription className="text-sm">
                        Please enter your email address for password reset link.
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
                        <form.AppField name="email">
                            {(field) => (
                                <field.Input
                                    label="Email"
                                    variant="default"
                                    placeholder="you@example.com"
                                    className="rounded-sm text-sm tracking-wider md:text-sm"
                                    labelClassName="text-sm md:text-sm tracking-wider"
                                />
                            )}
                        </form.AppField>

                        <form.AppForm>
                            <form.AuthSubmitButton
                                label="Send reset link"
                                loadingLabel="Signing in"
                                className="bg-accent/80 dark:bg-chart-4 mb-2 h-9 w-full rounded-md text-sm"
                            />
                        </form.AppForm>
                    </form>
                </CardContent>

                <CardFooter className="justify-center border-t pt-5">
                    <Link
                        to="/sign-in"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm"
                    >
                        <ArrowLeft className="size-4" />
                        Back to sign in
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
