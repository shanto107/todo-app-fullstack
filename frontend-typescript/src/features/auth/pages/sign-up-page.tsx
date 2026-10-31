import { Link } from "react-router";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { LucideUserRoundPlus } from "lucide-react";
import SignUpForm from "../components/sign-up-form";

export default function SignUpPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
            {/* Sign-in Card */}
            <Card className="relative z-10 w-full max-w-lg gap-6 rounded-md py-6">
                <CardHeader className="gap-6 px-6">
                    {/* <Logo className="gap-3" /> */}

                    <div>
                        <CardTitle className="mb-2 flex items-center gap-3 text-2xl font-semibold">
                            Sign Up{" "}
                            <LucideUserRoundPlus className="text-accent/80 dark:text-chart-1" />
                        </CardTitle>

                        <CardDescription className="text-base">
                            Enter your information below to create an account
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="px-6">
                    <SignUpForm />
                </CardContent>

                <CardFooter className="justify-center px-6">
                    <p className="text-muted-foreground text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/sign-in"
                            className="text-card-foreground ml-1 font-medium hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
