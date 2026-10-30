import type { ZodSchema } from "zod";

import type { ApiResponse } from "@/types/api";

import { config } from "../config";
import { ApiError } from "./api-error";

const BASE_API_URL = config.apiURL;

export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit,
    schema?: ZodSchema<T>,
): Promise<T> {
    let response: Response;
    const API_URL = BASE_API_URL + endpoint;
    const fetchOptions = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    };
    try {
        response = await fetch(API_URL, fetchOptions);
    } catch (error) {
        console.error(error);
        const statusCode = 0;
        const code = "NETWORK_ERROR";
        const errors = [
            {
                message: "Could not connect to the server. Please try again.",
            },
        ];
        throw new ApiError(
            statusCode,
            code,
            errors[0]?.message ?? "An unexpected error occurred",
            errors,
        );
    }

    const apiResponse = await response.text();
    let apiJsonResponse: ApiResponse<T> | null = null;

    if (apiResponse) {
        try {
            const parsedJson: unknown = JSON.parse(apiResponse);
            apiJsonResponse = parsedJson as ApiResponse<T>;
        } catch (error) {
            console.error(error);
            const code = "INVALID_RESPONSE";
            const errors = [
                {
                    message: "Invalid response from the server.",
                },
            ];
            throw new ApiError(
                response.status,
                code,
                errors[0]?.message ?? "An unexpected error occurred",
                errors,
            );
        }
    }

    if (!response.ok || !apiJsonResponse?.success) {
        const code = apiJsonResponse?.code ?? "UNKNOWN_ERROR";
        const message = apiJsonResponse?.message ?? "Unknown server error!";
        const errors = apiJsonResponse?.errors ?? [{ message }];
        throw new ApiError(response.status, code, message, errors);
    }

    if (schema) {
        const parsedResponse = schema.safeParse(apiJsonResponse.data);
        if (!parsedResponse.success) {
            throw new ApiError(
                response.status,
                "INVALID_RESPONSE",
                "The server returned data in an unexpected format.",
                parsedResponse.error.issues.map((issue) => ({
                    message: issue.message,
                })),
            );
        }
        return parsedResponse.data;
    }

    return apiJsonResponse.data as T;
}
