import type { DB } from "#src/db/index.js";

import { createProfileControllers } from "./profile.controllers.js";
import { createProfileSettingsRepository } from "./profile.repository.js";
import { createProfileService } from "./profile.service.js";

export function createProfileSettingsModule(db: DB) {
    const repository = createProfileSettingsRepository(db);
    const service = createProfileService(repository);
    const controllers = createProfileControllers(service);

    return {
        profileRepository: repository,
        profileService: service,
        profileControllers: controllers,
    };
}
