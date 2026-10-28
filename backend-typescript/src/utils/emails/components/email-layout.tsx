import { Body, Container, Head, Html, Preview } from "@react-email/components";

import type { ReactNode } from "react";

type EmailLayoutProps = {
    previewText: string;
    children: ReactNode;
};

export function EmailLayout({ previewText, children }: EmailLayoutProps) {
    return (
        <Html lang="en">
            <Head />

            <Preview>{previewText}</Preview>

            <Body
                style={{
                    backgroundColor: "#f4f6f8",
                    color: "#252a31",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    margin: 0,
                    padding: "40px 16px",
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        margin: "0 auto",
                        maxWidth: "520px",
                        padding: "36px 32px",
                    }}
                >
                    <TextBrand />

                    {children}

                    <TextFooter />
                </Container>
            </Body>
        </Html>
    );
}

function TextBrand() {
    return (
        <div
            style={{
                color: "#1769aa",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "-0.2px",
                marginBottom: "32px",
            }}
        >
            Office Ticketing App
        </div>
    );
}

function TextFooter() {
    return (
        <div
            style={{
                borderTop: "1px solid #e5e7eb",
                color: "#717780",
                fontSize: "12px",
                lineHeight: "20px",
                marginTop: "32px",
                paddingTop: "20px",
            }}
        >
            This is an automated message from Office Ticketing App. Please do
            not share verification or password-reset links.
        </div>
    );
}
