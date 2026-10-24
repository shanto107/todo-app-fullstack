import { ApiError } from "@/lib/api/api-error";

export function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        if (error.errors.length > 0) {
            return error.errors.map((e) => e.message).join("\n");
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong.";
}