import { EmailLayout } from "../components/email-layout.js";
import { Button, Heading, Link, Text } from "@react-email/components";

type VerificationEmailProps = {
    name: string;
    verificationUrl: string;
};

export function VerificationEmail({
    name,
    verificationUrl,
}: VerificationEmailProps) {
    return (
        <EmailLayout previewText="Verify your email address">
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
                Verify your email
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
                Welcome to Office Ticketing App. Please verify your email
                address to complete your registration.
            </Text>

            <Button
                href={verificationUrl}
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
                Verify email address
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
                href={verificationUrl}
                style={{
                    color: "#1769aa",
                    fontSize: "13px",
                    overflowWrap: "anywhere",
                }}
            >
                Verify your email address
            </Link>

            <Text
                style={{
                    color: "#717780",
                    fontSize: "13px",
                    lineHeight: "22px",
                    marginTop: "24px",
                }}
            >
                If you didn't create this account, you can safely ignore this
                email.
            </Text>
        </EmailLayout>
    );
}
