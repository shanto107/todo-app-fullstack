import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type ProfileErrorCardProps = {
    message?: string;
    onRetry: () => void;
};

export function ProfileErrorCard({ message, onRetry }: ProfileErrorCardProps) {
    return (
        <Card className="mx-auto w-full max-w-md rounded-sm">
            <CardHeader className="items-center text-center">
                <div className="bg-destructive/10 text-destructive mb-2 flex size-12 items-center justify-center rounded-full">
                    <AlertCircle className="size-6" />
                </div>

                <CardTitle className="text-xl">
                    Unable to load profile
                </CardTitle>

                <CardDescription className="text-sm">
                    We couldn't retrieve your profile information.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {message && (
                    <p className="text-muted-foreground bg-muted rounded-md p-3 text-center text-sm">
                        {message}
                    </p>
                )}
            </CardContent>

            <CardFooter className="justify-center">
                <Button
                    onClick={onRetry}
                    variant="outline"
                    className={"rounded-sm"}
                >
                    <RefreshCw className="mr-2 size-4" />
                    Try again
                </Button>
            </CardFooter>
        </Card>
    );
}
