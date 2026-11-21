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

export class ConflictError extends AppError {
    constructor(message: string) {
        super(ERROR_CODES.CONFLICT, 409, message);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(ERROR_CODES.UNAUTHORIZED, 401, message);
    }
}
