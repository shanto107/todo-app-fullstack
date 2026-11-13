import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, KeyRound } from "lucide-react";
import { Link } from "react-router";

export default function InvalidTokenCard() {
    return (
        <div className="bg-muted/30 flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md rounded-sm">
                <CardHeader className="items-center text-center">
                    <div className="bg-destructive/10 text-destructive mb-3 flex size-16 items-center justify-center rounded-full">
                        <KeyRound className="size-8" />
                    </div>

                    <CardTitle className="text-2xl">Invalid Token</CardTitle>

                    <CardDescription className="text-sm">
                        This password reset link is invalid or has expired.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Button
                        className="h-9 w-full rounded-sm text-sm"
                        render={
                            <Link to="/forgot-password">
                                Request another reset link
                            </Link>
                        }
                    />
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
