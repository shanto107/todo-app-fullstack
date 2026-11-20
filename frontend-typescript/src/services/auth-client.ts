import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { config } from "@/lib/config";

import type { auth } from "../../../backend-typescript/src/utils/auth/auth";

export const authClient = createAuthClient({
    baseURL: config.betterAuthUrl,
    fetchOptions: {
        credentials: "include",
    },
    plugins: [inferAdditionalFields<typeof auth>()],
});
