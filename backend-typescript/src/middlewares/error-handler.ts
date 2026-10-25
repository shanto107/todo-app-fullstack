import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { sendError } from "../shared/http-response.js";

export const ERROR_CODES = {
    VALIDATION: "VALIDATION_ERROR",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    CONFLICT: "CONFLICT",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export class AppError extends Error {
    constructor(
        public code: ErrorCode,
        public statusCode: number,
        message: string,
    ) {
        super(message);
    }
}

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(ERROR_CODES.BAD_REQUEST, 400, message);
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(ERROR_CODES.NOT_FOUND, 404, message);
    }
}

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) {
    if (err instanceof ZodError) {
        const errors = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        return sendError(
            res,
            400,
            ERROR_CODES.VALIDATION,
            "validation failed!",
            errors,
        );
    }

    if (err instanceof AppError) {
        return sendError(res, err.statusCode, err.code, err.message, null);
    }

    // Internal Server Error Handling
    console.error(err);
    return sendError(
        res,
        500,
        "INTERNAL_SERVER_ERROR",
        "Something went wrong!",
        null,
    );
}
