import { BadRequestError } from "#src/utils/errors/app-error.js";

import type {
    UpdateProfileBody,
    UpdateProfilePayload,
} from "./profile.types.js";

export async function validateDesignation(
    designationId: string | null | undefined,
    getDesignations: () => Promise<{ id: string }[]>,
) {
    if (!designationId) return;

    const designations = await getDesignations();

    const exists = designations.some(
        (designation) => designation.id === designationId,
    );
    if (!exists) {
        throw new BadRequestError("designation does not exist!");
    }
}

export function buildProfileUpdatePayload(
    payload: UpdateProfileBody,
): UpdateProfilePayload {
    const { dateOfBirth, ...rest } = payload;

    return {
        ...rest,
        ...(dateOfBirth !== undefined && {
            dateOfBirth: dateOfBirth
                ? new Date(`${dateOfBirth}T00:00:00.000Z`)
                : null,
        }),
    };
}
