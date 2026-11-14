import { PENDING_VERIFICATION_EMAIL_KEY } from "@/features/auth/constants/email-verification";
import { authClient } from "@/services/auth-client";
import PageSpinner from "../loading/page-spinner";
import { Navigate, Outlet } from "react-router";

export default function GuestRoute() {
    const { data: session, isPending } = authClient.useSession();
    const hasPendingVerification = Boolean(
        sessionStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY),
    );
    if (isPending) {
        return <PageSpinner />;
    }

    if (session) {
        if (!session.user.emailVerified) {
            return <Navigate to="/verify-email" replace />;
        }
        return <Navigate to={"/"} replace />;
    }
    
    if (hasPendingVerification) {
        return <Navigate to="/verify-email" replace />;
    }
    return <Outlet />;
}
