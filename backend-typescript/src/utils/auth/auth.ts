import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";

import config from "#src/config.js";
import { db } from "#src/db/index.js";

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
                required: true,
                input: true,
            },
        },
    },

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },

    // emailVerification: {
    //     autoSignInAfterVerification: true,
    //     sendOnSignUp: true,
    // },

    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 5, // 5 minutes
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
