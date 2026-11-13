import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import PageSpinner from "@/components/common/loading/page-spinner";
import { authClient } from "@/services/auth-client";

import EmailNotFoundCard from "../components/verify-email/email-not-found-card";
import UnverifiedEmailCard from "../components/verify-email/unverified-email-card";
import VerifiedEmailCard from "../components/verify-email/verified-email-card";
import {
    PENDING_VERIFICATION_EMAIL_KEY,
    VERIFICATION_RESEND_AFTER_KEY,
} from "../constants/email-verification";

type LocationState = {
    email?: string;
};

function getRemainingCooldown() {
    const cooldownUntil = Number(
        sessionStorage.getItem(VERIFICATION_RESEND_AFTER_KEY) ?? 0,
    );
    return Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
}

export default function VerifyEmailPage() {
    const location = useLocation();

    const state = location.state as LocationState | undefined;
    const [pendingEmail] = useState(
        () =>
            state?.email ??
            sessionStorage.getItem(PENDING_VERIFICATION_EMAIL_KEY) ??
            "",
    );

    const { data: session, isPending: isSessionPending } =
        authClient.useSession();

    const isVerified = Boolean(session?.user?.emailVerified);

    const email = isVerified
        ? (session?.user?.email ?? pendingEmail)
        : pendingEmail || session?.user?.email || "";

    const [remainingCooldown, setRemainingCooldown] =
        useState(getRemainingCooldown);
    const hasCooldown = remainingCooldown > 0;

    useEffect(() => {
        if (!hasCooldown) return;
        const interval = window.setInterval(() => {
            const latestRemainingCooldown = getRemainingCooldown();
            setRemainingCooldown(latestRemainingCooldown);
            if (latestRemainingCooldown === 0) {
                sessionStorage.removeItem(VERIFICATION_RESEND_AFTER_KEY);
            }
        }, 1000);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isVerified) return;
        sessionStorage.removeItem(PENDING_VERIFICATION_EMAIL_KEY);
        sessionStorage.removeItem(VERIFICATION_RESEND_AFTER_KEY);
        setRemainingCooldown(0);
    }, [isVerified]);

    if (isSessionPending) {
        return <PageSpinner />;
    }

    if (isVerified) {
        return <VerifiedEmailCard email={email} />;
    }

    if (!email) {
        return <EmailNotFoundCard />;
    }

    return (
        <UnverifiedEmailCard
            email={email}
            remainingCooldown={remainingCooldown}
            setRemainingCooldown={setRemainingCooldown}
        />
    );
}
