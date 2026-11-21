import { asc, eq } from "drizzle-orm";

import type { DB } from "#src/db/index.js";
import { user } from "#src/db/schema/auth-schema.js";
import { designations } from "#src/db/schema/designations.js";

import type { UpdateProfilePayload } from "./profile.types.js";

export function createProfileSettingsRepository(db: DB) {
    async function getProfile(userId: string) {
        return db.query.user.findFirst({
            where: eq(user.id, userId),
            columns: {
                id: true,
                name: true,
                email: true,
                emailVerified: true,
                image: true,
                employeeId: true,
                mobileNumber: true,
                designationId: true,
                dateOfBirth: true,
                homeAddress: true,
            },
            with: {
                designation: {
                    columns: {
                        id: true,
                        name: true,
                        code: true,
                    },
                },
            },
        });
    }

    async function updateProfileSettings(
        userId: string,
        payload: UpdateProfilePayload,
    ) {
        return db
            .update(user)
            .set(payload)
            .where(eq(user.id, userId))
            .returning({ id: user.id });
    }

    async function getDesignations() {
        return db
            .select({
                id: designations.id,
                name: designations.name,
                code: designations.code,
            })
            .from(designations)
            .orderBy(asc(designations.name));
    }

    return {
        getProfile,
        updateProfileSettings,
        getDesignations,
    };
}

export type ProfileSettingsRepository = ReturnType<
    typeof createProfileSettingsRepository
>;
