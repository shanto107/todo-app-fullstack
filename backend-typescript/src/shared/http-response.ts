import { Response } from "express";

export type ApiError = {
    message: string;
    field?: string;
}

export type ApiResponse<T> = {
    success: boolean;
    code?: string;
    message: string;
    data: T | null;
    errors: ApiError[] | null;
}

export function sendSuccess<T>(
    res: Response,
    statusCode: number,
    code: string,
    message: string,
    data: T
) {
    return res.status(statusCode).json({
        success: true,
        code,
        message,
        data,
        errors: null
    } satisfies ApiResponse<T>);
}

export function sendError(
    res: Response,
    statusCode: number,
    code: string,
    message: string,
    errors: ApiError[] | null
) {
    return res.status(statusCode).json({
        success: false,
        code,
        message,
        data: null,
        errors
    } satisfies ApiResponse<null>);
}