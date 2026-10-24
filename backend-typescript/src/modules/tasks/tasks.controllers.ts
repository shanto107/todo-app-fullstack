import { Request, NextFunction, Response } from "express";
import { TaskService } from "./tasks.service.js";
import {
    AddTaskRequest,
    BulkTaskActionRequst,
    DeleteTaskRequst,
    GetTaskRequest,
    GetTasksRequest,
    RestoreTaskRequst,
    TaskFilters,
    UpdateTaskPayload,
    UpdateTaskRequest,
} from "./tasks.types.js";
import { attempt } from "../../shared/attempt.js";
import { sendSuccess } from "../../shared/http-response.js";
import { SUCCESS_CODES, successMessage } from "./task.messages.js";

export function createTaskControllers(service: TaskService) {
    return {
        async addTaskHandler(
            req: AddTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const { body } = req;
            const [task, error] = await attempt(service.addTask(body));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                201,
                SUCCESS_CODES.TASK_CREATED,
                successMessage.addTask(task.id),
                task,
            );
        },

        async getTasksHandler(
            _req: GetTasksRequest,
            res: Response<any, { query: TaskFilters }>,
            next: NextFunction,
        ): Promise<void> {
            const query = res.locals.query;
            const [tasks, error] = await attempt(service.getTasks(query));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_FETCHED,
                successMessage.getTasks(),
                tasks,
            );
        },

        async getTaskByIdHandler(
            req: GetTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const { id } = req.params;
            const [task, error] = await attempt(service.getTaskById(id));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_FETCHED,
                successMessage.getTaskById(id),
                task,
            );
        },

        async getTaskCountsHandler(
            _req: Request,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const [task, error] = await attempt(service.getTaskCounts());
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_COUNTS_FETCHED,
                successMessage.getTaskCounts(),
                task,
            );
        },

        async updateTasksHandler(
            req: UpdateTaskRequest,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const { id } = req.params;
            const { body } = req;
            const payload: UpdateTaskPayload = {
                id,
                ...body,
            };
            const [task, error] = await attempt(service.updateTask(payload));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_UPDATED,
                successMessage.updateTask(task.id),
                task,
            );
        },

        async deleteTaskHandler(
            req: DeleteTaskRequst,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const { id } = req.params;
            const [task, error] = await attempt(service.deleteTask(id));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASK_DELETED,
                successMessage.deleteTask(task.id),
                task,
            );
        },

        async restoreTaskHandler(
            req: RestoreTaskRequst,
            res: Response,
            next: NextFunction,
        ): Promise<void> {
            const { id } = req.params;
            const [task, error] = await attempt(service.restoreTask(id));
            if (error) {
                return next(error);
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
        async bulkCompleteTasksHandler(
            req: BulkTaskActionRequst,
            res: Response,
            next: NextFunction,
        ) {
            const { ids } = req.body;
            const [count, error] = await attempt(
                service.bulkCompleteTasks(ids),
            );
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("complete", count),
                { count },
            );
        },

        async bulkActivateTasksHandler(
            req: BulkTaskActionRequst,
            res: Response,
            next: NextFunction,
        ) {
            const { ids } = req.body;
            const [count, error] = await attempt(
                service.bulkActivateTasks(ids),
            );
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("activate", count),
                { count },
            );
        },

        async bulkDeleteTasksHandler(
            req: BulkTaskActionRequst,
            res: Response,
            next: NextFunction,
        ) {
            const { ids } = req.body;
            const [count, error] = await attempt(service.bulkDeleteTasks(ids));
            if (error) {
                return next(error);
            }
            sendSuccess(
                res,
                200,
                SUCCESS_CODES.TASKS_UPDATED,
                successMessage.bulkTask("delete", count),
                { count },
            );
        },

        async bulkRestoreTasksHandler(
            req: BulkTaskActionRequst,
            res: Response,
            next: NextFunction,
        ) {
            const { ids } = req.body;
            const [count, error] = await attempt(service.bulkRestoreTasks(ids));
            if (error) {
                return next(error);
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
