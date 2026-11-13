import { Mail, UserRoundPlus } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function EmailNotFoundCard() {
    const navigate = useNavigate();
    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="mt-2 items-center text-center">
                    <div className="bg-muted mb-3 flex size-16 items-center justify-center rounded-full">
                        <Mail className="text-muted-foreground size-8" />
                    </div>

                    <CardTitle className="text-2xl">
                        Verification details unavailable
                    </CardTitle>

                    <CardDescription>
                        We couldn't find a pending email verification request in
                        this browser.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        className="mb-4 h-9 w-full rounded-sm text-sm"
                        variant="default"
                        onClick={() => navigate("/sign-up")}
                    >
                        <div className="flex items-center gap-2">
                            <p>Return to sign up</p>
                            <UserRoundPlus />
                        </div>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
