import type { Request } from "express";

import { AuthSession } from "#src/utils/auth/auth.js";

export type TypedRequest<
    Params = Record<string, never>,
    Body = unknown,
    Query = Record<string, never>,
> = Request<Params, unknown, Body, Query>;

export type AuthenticatedLocals = Omit<Express.Locals, "auth"> & {
    auth: AuthSession;
};
