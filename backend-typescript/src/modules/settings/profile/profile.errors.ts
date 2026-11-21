import { ConflictError } from "#src/utils/errors/app-error.js";
import { isUniqueViolation } from "#src/utils/errors/db-errors.js";

export function handleProfileUpdateError(error: unknown): never {
    if (isUniqueViolation(error)) {
        throw new ConflictError("Mobile number is already in use!");
    }
    throw error;
}
