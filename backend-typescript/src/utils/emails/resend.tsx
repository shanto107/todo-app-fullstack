import { Resend } from "resend";

import config from "#src/config.js";

import { VerificationEmail } from "./auth-emails/verification-email.js";

const resend = new Resend(config.email.apiKey);

type SendVerificationEmailOptions = {
    to: string;
    name: string;
    verificationUrl: string;
};

export async function sendVerificationEmail({
    to,
    name,
    verificationUrl,
}: SendVerificationEmailOptions) {
    const { data, error } = await resend.emails.send({
        from: config.email.from,
        to,
        subject: "Verify your Office Ticketing App email",
        react: (
            <VerificationEmail name={name} verificationUrl={verificationUrl} />
        ),
    });

    if (error) {
        throw new Error(`Failed to send verification email: ${error.message}`);
    }

    return data;
}
