import { Router } from "express";
import healthRouter from "../modules/health/health.route.js";
import { type DB } from "../db/index.js";
import { createTaskModule } from "../modules/tasks/tasks.module.js";
import { createTaskRouter } from "../modules/tasks/tasks.routes.js";

export function createApiRouter(db: DB) {
    const router = Router();

    const { taskControllers } = createTaskModule(db);
    const taskRouter = createTaskRouter(taskControllers);

    router.use("/health", healthRouter);
    router.use("/tasks", taskRouter);

    return router;
}
