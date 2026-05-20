import { createTaskRepo } from "./tasks.repository.js";
import { createTaskService } from "./tasks.service.js";
import { createTaskControllers } from "./tasks.controllers.js";
import { type DB } from "../../db/index.js";

export function createTaskModule(db: DB) {
    const repository = createTaskRepo(db);
    const service = createTaskService(repository);
    const controllers = createTaskControllers(service);

    return {
        taskRepository: repository,
        taskService: service,
        taskControllers: controllers
    }
}