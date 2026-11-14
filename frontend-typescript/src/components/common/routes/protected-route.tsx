import { Navigate, Outlet, useLocation } from "react-router";

import PageSpinner from "@/components/common/loading/page-spinner";
import { authClient } from "@/services/auth-client";
import { PENDING_VERIFICATION_EMAIL_KEY } from "@/features/auth/constants/email-verification";

export default function ProtectedRoute() {
    const location = useLocation();
    const { data: session, isPending } = authClient.useSession();
    const hasPendingVerification = Boolean(
        sessionStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY),
    );

    if (isPending) {
        return <PageSpinner />;
    }

    if (!session) {
        if (hasPendingVerification) {
            return <Navigate to="/verify-email" replace />;
        }
        return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }
    
    if (!session.user.emailVerified) {
        return <Navigate to="/verify-email" replace />;
    }

    return <Outlet />;
}
