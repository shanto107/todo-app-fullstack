import { Link, Outlet } from "react-router";

import { authClient } from "@/services/auth-client";
import SettingsHeader from "@/features/settings/components/layout/settings-header";
import SettingsNavbar from "@/features/settings/components/layout/settings-navbar";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function SettingsLayout() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const isMobile = useIsMobile();
    const image = `https://dpdc.org.bd/site/nocs/showPhoto/${user?.employeeId}`;
    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-6">
            {isMobile && (
                <Button
                    render={
                        <Link to="/">
                            <House className="size-6" />
                        </Link>
                    }
                    size="icon"
                    className="fixed top-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg"
                    aria-label="Go to home"
                />
            )}
            {!isMobile && (
                <Button
                    render={
                        <Link to="/" className="flex items-center gap-2">
                            <House className="size-5" />
                            <span className="text-sm font-semibold">Home</span>
                        </Link>
                    }
                    size="default"
                    className="fixed top-8 left-24 z-50 h-10 rounded-xl"
                    aria-label="Go to home"
                />
            )}
            <SettingsHeader
                name={user?.name}
                email={user?.email}
                employeeId={user?.employeeId}
                image={image}
            />

            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <SettingsNavbar />

                <main className="min-w-0 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
