import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, KeyRoundIcon } from "lucide-react";
import { Link } from "react-router";

export default function EmailSubmittedCard({
    submittedEmail,
    setSubmittedEmail,
}: {
    submittedEmail: string;
    setSubmittedEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="mt-2 items-center space-y-2 text-center">
                    <div className="bg-primary/10 mb-3 flex size-16 items-center justify-center rounded-full">
                        <KeyRoundIcon className="text-primary/80 dark:text-chart-3 size-8" />
                    </div>

                    <CardTitle className="text-2xl">
                        Password Reset Email Sent!
                    </CardTitle>

                    <CardDescription className="text-sm">
                        Please check your email address for the password reset
                        link.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="bg-muted/40 rounded-lg border p-4">
                        <p className="text-muted-foreground mb-1 text-xs">
                            Email address
                        </p>

                        <p className="text-sm font-semibold break-all">
                            {submittedEmail}
                        </p>
                    </div>

                    <p className="text-muted-foreground text-center">
                        Check your inbox and spam folder and The reset link
                        expires in{" "}
                        <span className="text-red-400">15 minutes</span>
                    </p>

                    <Button
                        className="mb-2 h-9 w-full rounded-sm text-sm"
                        onClick={() => {
                            setSubmittedEmail("");
                        }}
                    >
                        Try another email
                    </Button>
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
