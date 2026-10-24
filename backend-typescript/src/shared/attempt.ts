import { AppError } from "../middlewares/error-handler.js";

export async function attempt<T>(
    promise: Promise<T>,
): Promise<[T, null] | [null, AppError | Error]> {
    try {
        const data = await promise;
        return [data, null];
    } catch (error) {
        return [
            null,
            error instanceof Error ? error : new Error(String(error)),
        ];
    }
}
