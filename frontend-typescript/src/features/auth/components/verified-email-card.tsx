import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function VerifiedEmailCard({ email }: { email: string }) {
    const navigate = useNavigate();
    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center text-center mt-2">
                    <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
                        <CheckCircle2 className="size-9 text-green-600 dark:text-green-400" />
                    </div>

                    <CardTitle className="text-2xl">Email verified!</CardTitle>

                    <CardDescription className="max-w-sm">
                        Your email address has been successfully verified. Your
                        account is now ready to use.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="bg-muted/40 flex items-center gap-3 rounded-lg border p-4">
                        <Mail className="text-muted-foreground size-5 shrink-0" />

                        <div className="min-w-0 flex-1">
                            <p className="text-muted-foreground text-xs">
                                Verified email address
                            </p>

                            <p className="text-sm font-medium break-all">
                                {email}
                            </p>
                        </div>

                        <CheckCircle2 className="size-5 shrink-0 text-green-600" />
                    </div>

                    <Button
                        className="h-9 w-full rounded-sm text-sm mb-4"
                        onClick={() =>
                            navigate("/tasks/inbox", {
                                replace: true,
                            })
                        }
                    >
                        Continue to application
                        <ArrowRight className="ml-2 size-4" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
