import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError, ERROR_CODES } from "#src/utils/errors/app-error.js";

import { sendError } from "../utils/helper-functions/http-response.js";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        sendError(
            res,
            400,
            ERROR_CODES.VALIDATION,
            "validation failed!",
            errors,
        );
        return;
    }

    if (err instanceof AppError) {
        sendError(res, err.statusCode, err.code, err.message, null);
        return;
    }

    // Internal Server Error Handling
    console.error(err);
    sendError(res, 500, "INTERNAL_SERVER_ERROR", "Something went wrong!", null);
}
