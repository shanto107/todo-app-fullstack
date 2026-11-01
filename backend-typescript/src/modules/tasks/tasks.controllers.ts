import type { NextFunction, Request, Response } from "express";

import { attempt } from "#src/utils/helper-functions/attempt.js";

import { sendSuccess } from "../../utils/helper-functions/http-response.js";
import { SUCCESS_CODES, successMessage } from "./task.messages.js";
import type { TaskService } from "./tasks.service.js";
import type {
    AddTaskRequest,
    BulkTaskActionRequest,
    DeleteTaskRequest,
    GetTaskLocals,
    GetTaskRequest,
    GetTasksRequest,
    RestoreTaskRequest,
    UpdateTaskPayload,
    UpdateTaskRequest,
} from "./tasks.types.js";

export function createTaskControllers(service: TaskService) {
    return {
        addTaskHandler: async (
            req: AddTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const { body } = req;
            const [task, error] = await attempt(service.addTask(body));
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                201,
                SUCCESS_CODES.TASK_CREATED,
                successMessage.addTask(task.id),
                task,
            );
        },

        getTasksHandler: async (
            _req: GetTasksRequest,
            res: Response<unknown, GetTaskLocals>,
            next: NextFunction,
        ): Promise<void> => {
            const [tasks, error] = await attempt(
                service.getTasks(res.locals.query),
            );
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_FETCHED,
                successMessage.getTasks(),
                tasks,
            );
        },

        getTaskByIdHandler: async (
            req: GetTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const { id } = req.params;
            const [task, error] = await attempt(service.getTaskById(id));
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_FETCHED,
                successMessage.getTaskById(id),
                task,
            );
        },

        getTaskCountsHandler: async (
            _req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const [counts, error] = await attempt(service.getTaskCounts());
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_COUNTS_FETCHED,
                successMessage.getTaskCounts(),
                counts,
            );
        },

        updateTasksHandler: async (
            req: UpdateTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const { id } = req.params;
            const { body } = req;
            const payload: UpdateTaskPayload = {
                id,
                ...body,
            };
            const [task, error] = await attempt(service.updateTask(payload));
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_UPDATED,
                successMessage.updateTask(task.id),
                task,
            );
        },

        deleteTaskHandler: async (
            req: DeleteTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const { id } = req.params;
            const [task, error] = await attempt(service.deleteTask(id));
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_DELETED,
                successMessage.deleteTask(task.id),
                task,
            );
        },

        restoreTaskHandler: async (
            req: RestoreTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const { id } = req.params;
            const [task, error] = await attempt(service.restoreTask(id));
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_RESTORED,
                successMessage.restoreTask(task.id),
                task,
            );
        },

        // bulk actions
        bulkCompleteTasksHandler: async (
            req: BulkTaskActionRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const [count, error] = await attempt(
                service.bulkCompleteTasks(req.body.ids),
            );
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("complete", count),
                { count },
            );
        },

        bulkActivateTasksHandler: async (
            req: BulkTaskActionRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const [count, error] = await attempt(
                service.bulkActivateTasks(req.body.ids),
            );
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("activate", count),
                { count },
            );
        },

        bulkDeleteTasksHandler: async (
            req: BulkTaskActionRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const [count, error] = await attempt(
                service.bulkDeleteTasks(req.body.ids),
            );
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("delete", count),
                { count },
            );
        },

        bulkRestoreTasksHandler: async (
            req: BulkTaskActionRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> => {
            const [count, error] = await attempt(
                service.bulkRestoreTasks(req.body.ids),
            );
            if (error) {
                next(error);
                return;
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("restore", count),
                { count },
            );
        },
    };
}

export type TaskControllers = ReturnType<typeof createTaskControllers>;
