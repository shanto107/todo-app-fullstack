import { NotFoundError } from "#src/utils/errors/app-error.js";

import { handleProfileUpdateError } from "./profile.errors.js";
import {
    buildProfileUpdatePayload,
    validateDesignation,
} from "./profile.helpers.js";
import type { ProfileSettingsRepository } from "./profile.repository.js";
import type { UpdateProfileBody } from "./profile.types.js";

export function createProfileService(repository: ProfileSettingsRepository) {
    async function getProfile(userId: string) {
        const profile = await repository.getProfile(userId);

        if (!profile) {
            throw new NotFoundError("Profile not found!");
        }

        return profile;
    }

    async function updateProfileSettings(
        userId: string,
        payload: UpdateProfileBody,
    ) {
        // handle invalid designation
        await validateDesignation(
            payload.designationId,
            repository.getDesignations,
        );
        // transform the date string to Date object in payload
        const repositoryPayload = buildProfileUpdatePayload(payload);
        // update the user
        let updatedUser;
        try {
            updatedUser = await repository.updateProfileSettings(
                userId,
                repositoryPayload,
            );
        } catch (error) {
            // handle duplicate phoneNumber error
            handleProfileUpdateError(error);
        }
        // handle invalid userId error
        if (!updatedUser) {
            throw new NotFoundError("Profile not found!");
        }

        return getProfile(userId);
    }

    async function getDesignations() {
        return repository.getDesignations();
    }

    return {
        getProfile,
        updateProfileSettings,
        getDesignations,
    };
}

export type ProfileService = ReturnType<typeof createProfileService>;