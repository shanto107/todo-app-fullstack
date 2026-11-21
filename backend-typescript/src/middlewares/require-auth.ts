import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

import { auth } from "#src/utils/auth/auth.js";
import { UnauthorizedError } from "#src/utils/errors/app-error.js";

export async function requireAuth(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            throw new UnauthorizedError(
                "Authorization failed! Please login first to access this resource.",
            );
        }

        res.locals.auth = session;
        next();
    } catch (error) {
        next(error);
    }
}
