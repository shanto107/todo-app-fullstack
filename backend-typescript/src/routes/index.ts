import { Router } from "express";

import { requireAuth } from "#src/middlewares/require-auth.js";
import { createProfileSettingsModule } from "#src/modules/settings/profile/profile.module.js";
import { createProfileRouter } from "#src/modules/settings/profile/profile.routes.js";

import { type DB } from "../db/index.js";
import healthRouter from "../modules/health/health.route.js";
import signUpRouter from "../modules/sign-up/sign-up.routes.js";
import { createTaskModule } from "../modules/tasks/tasks.module.js";
import { createTaskRouter } from "../modules/tasks/tasks.routes.js";

export function createApiRouter(db: DB) {
    const router = Router();

    const { taskControllers } = createTaskModule(db);
    const { profileControllers } = createProfileSettingsModule(db);
    const taskRouter = createTaskRouter(taskControllers);
    const profileRouter = createProfileRouter(profileControllers);

    router.use("/health", healthRouter);
    router.use("/tasks", requireAuth, taskRouter);
    router.use("/sign-up", signUpRouter);
    router.use("/settings/profile", requireAuth, profileRouter);

    return router;
}
