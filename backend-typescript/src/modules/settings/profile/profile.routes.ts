import { Router } from "express";

import { validationHandler } from "#src/middlewares/validation-handler.js";

import type { ProfileControllers } from "./profile.controllers.js";
import { updateProfileSchema } from "./profile.validation.js";

export function createProfileRouter(controllers: ProfileControllers) {
    const router = Router();

    router.get("/me", controllers.getProfileHandler);

    router.patch(
        "/me",
        validationHandler({ body: updateProfileSchema }),
        controllers.updateProfileSettingsHandler,
    );

    router.get("/designations", controllers.getDesignationsHandler);

    return router;
}
