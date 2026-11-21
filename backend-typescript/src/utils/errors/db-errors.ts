function isPostgresError(error: unknown): error is Error & { code: string } {
    return (
        error instanceof Error &&
        "code" in error &&
        typeof error.code === "string"
    );
}

export function isUniqueViolation(error: unknown): boolean {
    let current = error;

    while (current instanceof Error) {
        if (isPostgresError(current) && current.code === "23505") {
            return true;
        }

        current = current.cause;
    }

    return false;
}
