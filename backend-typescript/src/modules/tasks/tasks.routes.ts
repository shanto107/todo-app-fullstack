import { Router } from "express";

import { validationHandler } from "../../middlewares/validation-handler.js";
import { TaskControllers } from "./tasks.controllers.js";
import {
    bulkTaskActionSchema,
    createTaskSchema,
    getTaskSchema,
    idInParamsSchema,
    updateTaskSchema,
} from "./tasks.validation.js";

export function createTaskRouter(controllers: TaskControllers) {
    const router = Router();

    router.post(
        "/",
        validationHandler({
            body: createTaskSchema,
        }),
        controllers.addTaskHandler,
    );

    router.get(
        "/",
        validationHandler({
            query: getTaskSchema,
        }),
        controllers.getTasksHandler,
    );

    router.get("/counts", controllers.getTaskCountsHandler);

    router.patch(
        "/bulk/complete",
        validationHandler({
            body: bulkTaskActionSchema,
        }),
        controllers.bulkCompleteTasksHandler,
    );

    router.patch(
        "/bulk/activate",
        validationHandler({
            body: bulkTaskActionSchema,
        }),
        controllers.bulkActivateTasksHandler,
    );

    router.patch(
        "/bulk/delete",
        validationHandler({
            body: bulkTaskActionSchema,
        }),
        controllers.bulkDeleteTasksHandler,
    );

    router.patch(
        "/bulk/restore",
        validationHandler({
            body: bulkTaskActionSchema,
        }),
        controllers.bulkRestoreTasksHandler,
    );

    router.get(
        "/:id",
        validationHandler({
            params: idInParamsSchema,
        }),
        controllers.getTaskByIdHandler,
    );

    router.put(
        "/:id",
        validationHandler({
            params: idInParamsSchema,
            body: updateTaskSchema,
        }),
        controllers.updateTasksHandler,
    );

    router.delete(
        "/:id",
        validationHandler({
            params: idInParamsSchema,
        }),
        controllers.deleteTaskHandler,
    );

    router.patch(
        "/:id/restore",
        validationHandler({
            params: idInParamsSchema,
        }),
        controllers.restoreTaskHandler,
    );

    return router;
}
