import { Link } from "react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LogIn } from "lucide-react";
import SignInForm from "../components/sign-in-form";

export default function SignInPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
            {/* Sign-in Card */}
            <Card className="relative z-10 w-full max-w-lg gap-6 rounded-md py-6">
                <CardHeader className="gap-6 px-6">
                    {/* <Logo className="gap-3" /> */}

                    <div>
                        <CardTitle className="mb-2 flex items-center gap-2 text-2xl font-semibold">
                            Sign In{" "}
                            <LogIn className="text-accent/80 dark:text-chart-1" />
                        </CardTitle>

                        <CardDescription className="text-base">
                            Welcome back. Enter your credentials to continue.
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-6">
                    <SignInForm />
                </CardContent>

                <CardFooter className="justify-center px-6">
                    <p className="text-muted-foreground text-center text-sm">
                        Don't have an account?{" "}
                        <Link
                            to="/sign-up"
                            className="text-card-foreground ml-2 font-medium hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
