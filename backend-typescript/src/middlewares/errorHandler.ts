import { NextFunction, Request, Response } from "express";
import { success, ZodError } from "zod";

export class AppError extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
};

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, 400);
    }
};

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404);
    }
};

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: "validation error",
            errors: err.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
        })
        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: null
        });
        return;
    }

    res.status(500).json({
        status: false,
        message: err.message || "Internal Server Error!",
        errors: null
    });
};