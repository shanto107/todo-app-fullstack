import { Outlet } from "react-router";

import { authClient } from "@/services/auth-client";
import SettingsHeader from "@/features/settings/components/layout/settings-header";
import SettingsNavbar from "@/features/settings/components/layout/settings-navbar";

export default function SettingsLayout() {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const image = `https://dpdc.org.bd/site/nocs/showPhoto/${user?.employeeId}`
    return (
        <div className="mx-auto w-full max-w-5xl space-y-6 p-4 md:p-6">
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
