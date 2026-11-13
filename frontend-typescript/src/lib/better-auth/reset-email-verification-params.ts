import {
    EMAIL_VERIFICATION_COOLDOWN_SECONDS,
    PENDING_VERIFICATION_EMAIL_KEY,
    VERIFICATION_RESEND_AFTER_KEY,
} from "@/features/auth/constants/email-verification";

export function resetEmailVerificationParams({
    email,
    setRemainingCooldown,
}: {
    email: string;
    setRemainingCooldown: React.Dispatch<React.SetStateAction<number>>;
}) {
    const cooldownUntil =
        Date.now() + EMAIL_VERIFICATION_COOLDOWN_SECONDS * 1000;
    sessionStorage.setItem(PENDING_VERIFICATION_EMAIL_KEY, email);
    sessionStorage.setItem(
        VERIFICATION_RESEND_AFTER_KEY,
        String(cooldownUntil),
    );
    setRemainingCooldown(EMAIL_VERIFICATION_COOLDOWN_SECONDS);
}


