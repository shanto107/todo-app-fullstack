import { Router } from "express";
import { TaskControllers } from "./tasks.controllers.js";

export function createTaskRouter(controllers: TaskControllers) {
    const router = Router();

    router.post("/", controllers.addTaskHandler);
    router.get("/", controllers.getTasksHandler);
    router.put("/:id", controllers.updateTasksHandler);
    router.delete("/:id", controllers.deleteTaskHandler);

    return router;
}
