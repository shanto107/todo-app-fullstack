import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";

import config from "#src/config.js";
import { db } from "#src/db/index.js";

import { sendVerificationEmail } from "../emails/resend.js";

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
        requireEmailVerification: false,
    },

    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendOnSignIn: true,
        expiresIn: 60 * 10, // 10 minutes

        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail({
                to: user.email,
                name: user.name,
                verificationUrl: url,
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
