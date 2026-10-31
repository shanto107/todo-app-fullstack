import PageSpinner from "@/components/common/loading/page-spinner";
import { authClient } from "@/services/auth-client";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const { data: session, isPending, error } = authClient.useSession();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (isPending) {
            setIsReady(false);
            return;
        }
        if (session) {
            setIsReady(true);
        }
    }, [isPending, session]);

    if (isPending || (!session && !isReady)) {
        return <PageSpinner />;
    }
    if (error || !session) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
}
