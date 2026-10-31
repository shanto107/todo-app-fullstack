import PageSpinner from "@/components/common/loading/page-spinner";
import { authClient } from "@/services/auth-client";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const { data: session, isPending, error } = authClient.useSession();

    if (isPending) {
        return <PageSpinner />;
    }
    if (error || !session) {
        return <Navigate to="/sign-in" replace />;
    }
    
    return <Outlet />;
}
