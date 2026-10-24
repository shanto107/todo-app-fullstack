import type { ApiErrorObject } from "@/types/api";

export class ApiError extends Error {
    public status: number;
    public code: string;
    public errors: ApiErrorObject[]

    constructor(
        status: number,
        code: string, 
        message: string,
        errors: ApiErrorObject[],
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.errors = errors;
    }
}