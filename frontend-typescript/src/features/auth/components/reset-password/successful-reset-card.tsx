import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

export default function SuccessfulResetCard() {
    const navigate = useNavigate();

    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center text-center">
                    <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                        <CheckCircle2 className="size-8" />
                    </div>

                    <CardTitle className="text-2xl">
                        Password reset successful
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <Button
                        className="mb-4 h-9 w-full rounded-sm text-sm"
                        onClick={() => navigate("/sign-in", { replace: true })}
                    >
                        Continue to sign in
                        <ArrowRight />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
