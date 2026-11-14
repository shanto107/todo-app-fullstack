import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";

import config from "#src/config.js";
import { db } from "#src/db/index.js";

import {
    sendPasswordResetEmail,
    sendVerificationEmail,
} from "../emails/resend.js";

export const auth = betterAuth({
    appName: "DPDC Ticketing App",

    user: {
        additionalFields: {
            employeeId: {
                type: "string",
                required: true,
                input: true,
            },
            mobileNumber: {
                type: "string",
                required: true,
                input: true,
            },
            designationId: {
                type: "string",
                required: false,
                input: false,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        resetPasswordTokenExpiresIn: 60 * 15,
        revokeSessionsOnPasswordReset: true,
        onExistingUserSignUp: ({ user }, request) => {
            const requestUrl = request ? new URL(request.url) : null;
            const signupAttempt = {
                event: "auth.existing_user_signup_attempt",
                timestamp: new Date().toISOString(),
                existingUser: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    emailVerified: user.emailVerified,
                },
                request: request
                    ? {
                          method: request.method,
                          path: requestUrl?.pathname,
                          origin: request.headers.get("origin"),
                          referer: request.headers.get("referer"),
                          userAgent: request.headers.get("user-agent"),
                          forwardedFor: request.headers.get("x-forwarded-for"),
                      }
                    : null,
            };
            console.info("[AUTH AUDIT]", signupAttempt);
            return Promise.resolve();
        },
        sendResetPassword: async ({ user, url }) => {
            await sendPasswordResetEmail({
                to: user.email,
                name: user.name,
                url,
            });
        },
    },

    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendOnSignIn: true,
        expiresIn: 60 * 15, // 15 minutes

        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail({
                to: user.email,
                name: user.name,
                url,
            });
        },
    },

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60, // 1 hour
        },
    },

    plugins: [
        organization({
            allowUserToCreateOrganization: false,
        }),
    ],

    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    baseURL: config.auth.url,
    secret: config.auth.secret,
    trustedOrigins: [config.auth.frontendUrl],
});

export type AuthSession = typeof auth.$Infer.Session;
export type AuthUser = typeof auth.$Infer.Session.user;
