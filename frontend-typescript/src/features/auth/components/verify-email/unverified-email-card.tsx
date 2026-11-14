import { Loader2, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { resetEmailVerificationParams } from "@/lib/better-auth/reset-email-verification-params";
import { toast } from "sonner";
import { authClient } from "@/services/auth-client";
import {
    PENDING_VERIFICATION_EMAIL_KEY,
    VERIFICATION_RESEND_AFTER_KEY,
} from "../../constants/email-verification";
import type { StripEmptyObjects } from "better-auth";

type Session = {
    user: StripEmptyObjects<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
    }>;
    session: StripEmptyObjects<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    }>;
} | null;

function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
        remainingSeconds,
    ).padStart(2, "0")}`;
}

export default function UnverifiedEmailCard({
    email,
    session,
    remainingCooldown,
    setRemainingCooldown,
}: {
    email: string;
    session: Session;
    remainingCooldown: number;
    setRemainingCooldown: React.Dispatch<React.SetStateAction<number>>;
}) {
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);
    const [isSwitchingAccount, setIsSwitchingAccount] = useState(false);

    async function handleResend() {
        if (remainingCooldown > 0 || isSending) return;

        setIsSending(true);
        try {
            const { error } = await authClient.sendVerificationEmail({
                email,
                callbackURL: `${window.location.origin}/verify-email`,
            });

            if (error) {
                toast.error("Failed to send verification email.", {
                    description: error.message,
                });
                return;
            }

            resetEmailVerificationParams({ email, setRemainingCooldown });
            toast.success("Verification email sent!", {
                description: `Check your inbox at ${email}.`,
            });
        } catch {
            toast.error("Something went wrong.", {
                description: "Please try again later.",
            });
        } finally {
            setIsSending(false);
        }
    }

    async function handleUseAnotherEmail() {
        if (isSwitchingAccount) return;

        setIsSwitchingAccount(true);
        try {
            if (session) {
                const { error } = await authClient.signOut();
                if (error) {
                    toast.error("Unable to switch accounts.", {
                        description: error.message,
                    });
                    return;
                }
            }
            sessionStorage.removeItem(PENDING_VERIFICATION_EMAIL_KEY);
            sessionStorage.removeItem(VERIFICATION_RESEND_AFTER_KEY);
            setRemainingCooldown(0);
            navigate("/sign-up", {
                replace: true,
            });
        } catch {
            toast.error("Something went wrong.", {
                description: "Unable to switch accounts. Please try again.",
            });
        } finally {
            setIsSwitchingAccount(false);
        }
    }

    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center text-center">
                    <div className="bg-primary/10 mb-3 flex size-16 items-center justify-center rounded-full">
                        <Mail className="text-primary/80 dark:text-chart-2 size-8" />
                    </div>

                    <CardTitle className="text-2xl">Check your email</CardTitle>

                    <CardDescription className="max-w-sm">
                        If an account can be created with this email address,
                        you'll receive a verification link.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="bg-muted/40 rounded-lg border p-4">
                        <p className="text-muted-foreground mb-1 text-xs">
                            Verification email sent to
                        </p>

                        <p className="text-sm font-semibold break-all">
                            {email}
                        </p>
                    </div>

                    <div className="space-y-2 text-sm">
                        <p className="font-medium">What should you do next?</p>

                        <ol className="text-muted-foreground list-inside list-decimal space-y-2">
                            <li>Open your email inbox.</li>
                            <li>Find the verification email.</li>
                            <li>Click the Verify email address button.</li>
                        </ol>
                    </div>

                    <div className="space-y-3">
                        <Button
                            className="mb-4 h-9 w-full rounded-sm text-sm"
                            onClick={() => void handleResend()}
                            disabled={
                                remainingCooldown > 0 || isSending || !email
                            }
                        >
                            {isSending ? (
                                <>
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                    Sending email...
                                </>
                            ) : remainingCooldown > 0 ? (
                                <>
                                    <RefreshCw className="mr-2 size-4" />
                                    Resend available in{" "}
                                    {formatTime(remainingCooldown)}
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="mr-2 size-4" />
                                    Resend verification email
                                </>
                            )}
                        </Button>

                        <p className="text-muted-foreground text-center text-xs">
                            You can request another verification email every 5
                            minutes.
                        </p>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col justify-center gap-2 border-t pt-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => void handleUseAnotherEmail()}
                        className={"text-sm"}
                        disabled={isSwitchingAccount}
                    >
                        {isSwitchingAccount
                            ? "Switching account..."
                            : "Sign up using different email"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
