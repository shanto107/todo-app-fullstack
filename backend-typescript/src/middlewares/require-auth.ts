import { fromNodeHeaders } from "better-auth/node";
import { NextFunction, Request, Response } from "express";

import { auth } from "#src/utils/auth/auth.js";
import { sendError } from "#src/utils/helper-functions/http-response.js";

import { ERROR_CODES } from "./error-handler.js";

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
            sendError(
                res,
                401,
                ERROR_CODES.UNAUTHORIZED,
                "Authorization failed!",
                null,
            );
            return;
        }

        res.locals.auth = session;
        next();
    } catch (error) {
        next(error);
    }
}
