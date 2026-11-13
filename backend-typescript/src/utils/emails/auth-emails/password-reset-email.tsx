import { Button, Heading, Link, Text } from "@react-email/components";
import { EmailLayout } from "../components/email-layout.js";

type PasswordResetEmailProps = {
    name: string;
    resetUrl: string;
};

export default function PasswordResetEmail({
    name,
    resetUrl,
}: PasswordResetEmailProps) {
    return (
        <EmailLayout previewText="Reset your DPDC Ticketing App password">
            <Heading
                style={{
                    color: "#18181b",
                    fontSize: "26px",
                    fontWeight: 700,
                    letterSpacing: "-0.8px",
                    lineHeight: "34px",
                    margin: "0 0 20px",
                }}
            >
                Reset your password
            </Heading>

            <Text
                style={{
                    color: "#52525b",
                    fontSize: "15px",
                    lineHeight: "25px",
                }}
            >
                Hello {name},
            </Text>

            <Text
                style={{
                    color: "#52525b",
                    fontSize: "15px",
                    lineHeight: "25px",
                }}
            >
                We received a request to reset the password associated with your
                DPDC Ticketing App account. Click the button below to choose a
                new password.
            </Text>

            <Button
                href={resetUrl}
                style={{
                    backgroundColor: "#1769aa",
                    borderRadius: "7px",
                    color: "#ffffff",
                    display: "inline-block",
                    fontSize: "14px",
                    fontWeight: 600,
                    padding: "13px 20px",
                    textDecoration: "none",
                }}
            >
                Reset password
            </Button>

            <Text
                style={{
                    color: "#717780",
                    fontSize: "13px",
                    lineHeight: "22px",
                    marginTop: "24px",
                }}
            >
                If the button doesn't work, copy and paste this link into your
                browser:
            </Text>

            <Link
                href={resetUrl}
                style={{
                    color: "#1769aa",
                    fontSize: "13px",
                    overflowWrap: "anywhere",
                }}
            >
                {resetUrl}
            </Link>
        </EmailLayout>
    );
}
