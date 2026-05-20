import { NextFunction, Request, Response } from "express";
import { TaskService } from "./tasks.service.js";
import { createTaskSchema, idInParamsSchema, updateTaskSchema } from "./tasks.validation.js";
import { UpdateTaskPayload } from "./tasks.types.js";

export function createTaskControllers(service: TaskService) {

    return {
        async addTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const data = createTaskSchema.parse(req.body);
                const newTask = await service.addTask(data);
                res.status(201).json({
                    success: true,
                    message: "Task created successfully!",
                    data: newTask
                });
            }
            catch (err) {
                next(err);
            }
        },
        
        async getTasksHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const tasks = await service.getAllTasks();
                res.status(200).json({
                    success: true,
                    message: "All Task fetched successfully!",
                    data: tasks
                });
            }
            catch (err) {
                next(err);
            }
        },
        
        async updateTasksHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const { id } = idInParamsSchema.parse(req.params);
                const data = updateTaskSchema.parse(req.body);
                const updatePayload = {
                    id,
                    ...data
                } as UpdateTaskPayload;
                const updatedTask = await service.updateTask(updatePayload);
                res.status(200).json({
                    success: true,
                    message: `Task with id [${id}] updated successfully!`,
                    data: updatedTask
                });
            }
            catch (err) {
                next(err);
            }
        },
        
        async deleteTaskHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const { id } = idInParamsSchema.parse(req.params);
                const deletedTask = await service.deleteTask(id);
                res.status(200).json({
                    success: true,
                    message: `Task with id [${id}] deleted successfully!`,
                    data: deletedTask
                });
            }
            catch (err) {
                next(err);
            }
        }
    }
}

export type TaskControllers = ReturnType<typeof createTaskControllers>;