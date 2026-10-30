import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/api-error";

type ErrorCardProps = {
    error: Error;
};

export function ErrorCard({ error }: ErrorCardProps) {
    const apiError = error instanceof ApiError ? error : null;

    return (
        <div className="flex min-h-[70vh] items-center justify-center p-6">
            <Card className="w-full max-w-md rounded-md border-1 border-destructive">
                <CardHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="size-5" />

                        <CardTitle>{apiError?.code ?? "UNKNOWN_ERROR"}</CardTitle>
                    </div>
                </CardHeader>

                <CardContent className="text-sm tracking-wide font-light text-red-400 dark:text-red-200">
                    <p>{error.message}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        className="rounded-sm text-sm flex-1 text-background bg-accent/80 dark:text-foreground"
                        onClick={() => window.location.reload()}
                    >
                        <RefreshCcw className="mr-2 size-4" />
                        Reload Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
