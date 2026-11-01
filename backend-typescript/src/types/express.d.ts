import type { AuthSession } from "#src/utils/auth/auth.js";

declare global {
    namespace Express {
        interface Locals {
            auth: AuthSession | null;
            query: unknown;
        }
    }
}

export {};
